import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';
import Login from './Login';

import {signIn, signInAnonymously} from '../api/auth';

interface State {
    isLogin: boolean;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLogin: true
        };

    }

    handleLogin = (isAnon: boolean, data: { email: string, password: string }) => {
        (isAnon ? signInAnonymously() : signIn(data.email, data.password)).then(
            () => {
                this.setState({
                    isLogin: true
                });
            }
        ).catch(err => {
            console.log(err);
        });
    }

    handleLogout = () => {
        this.setState({
            isLogin: false
        });
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
            )
            :
            (<Login doLogin={this.handleLogin}/>);
    }
}

export default App;
