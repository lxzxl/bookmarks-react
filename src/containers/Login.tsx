import * as React from 'react';
import * as Icons from 'react-feather';
import clone from 'lodash/clone';
import Notification from 'react-bulma-notification';
import { Rules, InputField } from '../components/InputField';

interface Account {
  email: string;
  password: string;
}

interface Props {
  isLoading: boolean;
  doLogin(data?: State): void;
}

interface State extends Account {
  hasError: boolean;
}

const demoAccount = {
  email: 'demo@demo.com',
  password: 'demo123'
};

export default class Login extends React.Component<Props, State> {
  private inputRefs: Array<InputField> = [];
  static getDefaultAccount(): Account {
    const lastEmail = localStorage.getItem('lastEmail');
    const account = clone(demoAccount);
    if (lastEmail && lastEmail !== account.email) {
      account.email = lastEmail;
      account.password = '';
    }
    return account;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      ...Login.getDefaultAccount()
    };
  }

  render() {
    const { isLoading, doLogin } = this.props;
    return (
      <div className="Login section">
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content loading">
            <p className="title is-4">Please login ...</p>
            <div className="columns is-mobile is-marginless is-multiline">
              <div className="column is-full-mobile is-half-tablet">
                <InputField
                  ref={this.collectInputs}
                  fieldClass={''}
                  controlClass={'has-icons-left'}
                  name="email"
                  type="email"
                  placeholder="Email"
                  PreIcon={Icons.Mail}
                  value={this.state.email}
                  rules={[Rules.Required]}
                  handleChange={this.handleInputChange}
                  handleKeyUp={this.handleKeyUp}
                  setValidateStatus={this.setValidateStatus}
                />
              </div>
              <div className="column is-full-mobile is-half-tablet">
                <InputField
                  ref={this.collectInputs}
                  fieldClass={''}
                  controlClass={'has-icons-left'}
                  name="password"
                  type="password"
                  placeholder="Password"
                  PreIcon={Icons.Lock}
                  value={this.state.password}
                  rules={[Rules.Required]}
                  handleChange={this.handleInputChange}
                  handleKeyUp={this.handleKeyUp}
                  setValidateStatus={this.setValidateStatus}
                />
              </div>
              <div className="column">
                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button className="login button is-success" onClick={this.beforeLogin}>
                      Login
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-center is-link" onClick={e => doLogin()}>
                      <span className="is-size-7">Anonymous</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {isLoading && (
              <div className="loading">
                <div className="loading_bar progress" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  collectInputs = (input: InputField) => {
    this.inputRefs = [...this.inputRefs, input];
  };

  handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const target = event.target;
    this.setState(() => ({
      [target.name]: target.value
    }));
  };

  handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      this.beforeLogin();
    }
  };

  beforeLogin = () => {
    // do validating
    const isValid = this.inputRefs.every(input => {
      return input.checkIsValid();
    });
    this.setState({ hasError: !isValid });
    if (!isValid) {
      Notification.error('Please check all error inputs!');
      return;
    }
    const { email } = this.state;
    const { doLogin } = this.props;
    if (email) {
      localStorage.setItem('lastEmail', email);
    }
    doLogin(this.state);
  };

  setValidateStatus = isValid => {
    this.setState({ hasError: !isValid });
  };
}
