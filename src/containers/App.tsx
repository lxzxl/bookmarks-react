import * as React from 'react';
import wilddog from 'wilddog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from 'react-bulma-notification';
import Main from './Main';
import Login from './Login';

import { app, AuthApi, CollectionsApi } from '../api';

interface State {
  isLoading: boolean;
  isLogin: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: !!app.auth().currentUser
    };
  }

  stopAuthStateListener?(): void;

  componentDidMount() {
    this.stopAuthStateListener = app
      .auth()
      .onAuthStateChanged((user: wilddog.User) => {
        CollectionsApi.setRef();
        this.setState({ isLoading: false });
        this.setState({ isLogin: !!user });
      });
  }

  componentWillUnmount() {
    if (this.stopAuthStateListener) {
      this.stopAuthStateListener();
    }
  }

  render() {
    const { isLogin, isLoading } = this.state;
    return isLogin ? (
      <div className="App">
        <Header doLogout={this.handleLogout} />
        <Main />
        <Footer />
      </div>
    ) : (
      <Login isLoading={isLoading} doLogin={this.handleLogin} />
    );
  }

  handleLogin = async (data?: { email: string; password: string }) => {
    try {
      this.setState({ isLoading: true });
      await (data
        ? AuthApi.signIn(data.email, data.password)
        : AuthApi.signInAnonymously());
      Notification.success('Welcome, you are logged in!');
    } catch (err) {
      Notification.error(err.message);
      this.setState({ isLoading: false });
    }
  };

  handleLogout = () => {
    AuthApi.signOut().then(() => {
      this.setState({
        isLogin: false
      });
    });
  };
}

export default App;
