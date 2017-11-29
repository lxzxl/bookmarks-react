import * as React from 'react';
import * as wilddog from 'wilddog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import Main from './Main';
import Login from './Login';

import {app, AuthApi, CollectionsApi} from '../api';

interface State {
    isLogin: boolean;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLogin: !!app.auth().currentUser
        };
    }

    stopAuthStateListener?(): void;

    componentDidMount() {
        this.stopAuthStateListener = app.auth().onAuthStateChanged((user: wilddog.User) => {
            CollectionsApi.setRef();
            this.setState({isLogin: !!user});
        });
    }

    componentWillUnmount() {
        if (this.stopAuthStateListener) {
            this.stopAuthStateListener();
        }
    }

    render() {
        const {isLogin} = this.state;
        return isLogin ?
            (
                <div className="App">
                    <Header doLogout={this.handleLogout}/>
                    <Main/>
                    <Footer/>
                </div>
            ) : <Login doLogin={this.handleLogin}/>;
    }

    handleLogin = async (isAnon: boolean, data: { email: string, password: string }) => {
        try {
            await isAnon ? AuthApi.signInAnonymously() : AuthApi.signIn(data.email, data.password);
        } catch (err) {
            Notification.error(err);
        }
    }

    handleLogout = async () => {
        await AuthApi.signOut();
        this.setState({
            isLogin: false
        });
    }
}

export default App;
