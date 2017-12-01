import * as React from 'react';
import * as Icons from 'react-feather';
import clone from 'lodash/clone';
import pick from 'lodash/pick';
import Notification from '../components/Notification';
import {Rules, InputField} from '../components/InputField';

interface Account {
    email: string;
    password: string;
}

interface Props {
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
    static getDefaultAccount(): Account {
        const lastEmail = localStorage.getItem('lastEmail');
        if (lastEmail) {
            return {
                email: lastEmail,
                password: ''
            };
        }
        return clone(demoAccount);
    }

    constructor(props: Props) {
        super(props);
        this.state = {hasError: false, ...Login.getDefaultAccount()};
    }

    pickAccount() {
        return pick(this.state, ['email', 'password']);
    }

    handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;
        this.setState(() => ({
            [target.name]: target.value
        }));
    }

    render() {
        const {doLogin} = this.props;
        return (
            <div className=" Login section">
                <div className="modal is-active">
                    <div className="modal-background"/>
                    <div className="modal-content">
                        <p className="title is-4">Please login ...</p>
                        <div className="columns is-mobile is-marginless is-multiline">
                            <div className="column is-full-mobile is-half-tablet">
                                <InputField fieldClass={''} controlClass={'has-icons-left'}
                                            name="email" type="email" placeholder="Email"
                                            PreIcon={Icons.Mail}
                                            value={this.state.email}
                                            rules={[Rules.Required]}
                                            handleChange={e => this.handleInputChange(e)}
                                            handleKeyUp={this.handleKeyUp}
                                            checkValidateStatus={this.checkValidateStatus}
                                />
                            </div>
                            <div className="column is-full-mobile is-half-tablet">
                                <InputField fieldClass={''} controlClass={'has-icons-left'}
                                            name="password" type="password" placeholder="Password"
                                            PreIcon={Icons.Lock}
                                            value={this.state.password}
                                            rules={[Rules.Required]}
                                            handleChange={e => this.handleInputChange(e)}
                                            handleKeyUp={this.handleKeyUp}
                                            checkValidateStatus={this.checkValidateStatus}
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
                    </div>
                </div>
            </div>
        );
    }

    handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            this.props.doLogin(this.state);
        }
    }

    beforeLogin = (e?: React.MouseEvent<HTMLButtonElement>): void => {
        if (!this.state.hasError) {
            Notification.error('Please check all error inputs!');
            return;
        }
        const {email} = this.state;
        const {doLogin} = this.props;
        if (email) {
            localStorage.setItem('lastEmail', email);
        }
        doLogin(this.state);
    }

    checkValidateStatus = (isValid) => {
        this.setState({hasError: isValid});
    }
}
