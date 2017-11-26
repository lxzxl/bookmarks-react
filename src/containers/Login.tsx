import * as React from 'react';
import * as Icons from 'react-feather';

interface Props {
    doLogin(isAnony: boolean, data: State): void;
}

interface State {
    email: string;
    password: string;
}

export default class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: 'demo@demo.com',
            password: 'demo123'
        };
    }

    handleInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        // Temp fix.
        this.setState(() => ({
            [target.name]: target.value
        }));
    }

    render() {
        const {doLogin} = this.props;
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        return (
            <div className=" Login section">
                <div className="modal is-active">
                    <div className="modal-background"/>
                    <div className="modal-content">
                        <p className="title is-4">Please login ...</p>
                        <div className="columns is-mobile is-marginless is-multiline">
                            <div className="column is-full-mobile is-half-tablet">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="email" className="input" type="email" placeholder="Email"
                                               value={this.state.email}
                                               onChange={e => this.handleInputChange(e)}/>
                                        <span className="icon is-small is-left">
                                            <Icons.Mail/>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="column is-full-mobile is-half-tablet">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="password" className="input" type="password" placeholder="Password"
                                               value={this.state.password}
                                               onChange={e => this.handleInputChange(e)}/>
                                        <span className="icon is-small is-left">
                                          <Icons.Lock/>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field is-grouped is-grouped-right">
                                    <div className="control">
                                        <button className="login button is-success" onClick={e => doLogin(false, data)}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-center is-link" onClick={e => doLogin(true, data)}>
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
}
