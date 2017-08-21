import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from './Main';
import Login from './Login';

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

    handleLogin = () => {
        this.setState({
            isLogin: true
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
