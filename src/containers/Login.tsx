import * as React from 'react';

interface Props {
    doLogin(): void;
}

export default class Login extends React.Component<Props, {}> {
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
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input className="input" type="email" placeholder="Email"/>
                                        <span className="icon is-small is-left">
                                          <i className="fa fa-envelope"/>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="column is-full-mobile is-half-tablet">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input className="input" type="password" placeholder="Password"/>
                                        <span className="icon is-small is-left">
                                          <i className="fa fa-lock"/>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <p className="control">
                                        <button className="login button is-success" onClick={doLogin}>
                                            Login
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
