import * as React from 'react';
import SignOut from './SignOut';

interface Props {
}

export default function (props: Props) {
    return (
        <div className="Header container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <span className="navbar-item is-size-3">Bookmarks</span>
                    <SignOut isHiddenDesktop={true}/>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <SignOut/>
                    </div>
                </div>
            </nav>
        </div>
    );
}
