import * as React from 'react';
import SignOut from './SignOut';

interface Props {
    doLogout(): void;
}

export default function (props: Props) {
    const {doLogout} = props;
    return (
        <div className="Header container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <span className="navbar-item is-size-3">Bookmarks</span>
                    <SignOut isHiddenDesktop={true} doLogout={doLogout}/>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <SignOut  doLogout={doLogout}/>
                    </div>
                </div>
            </nav>
        </div>
    );
}
