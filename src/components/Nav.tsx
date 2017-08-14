import * as React from 'react';
import SignOut from './SignOut';

interface Props {
}

export default function (props: Props) {
    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <a className="navbar-item is-size-3" href="/">
                        Bookmarks
                    </a>
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
