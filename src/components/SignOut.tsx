import * as React from 'react';

interface Props {
    isHiddenDesktop?: boolean;

    doLogout(): void;
}

export default function SignOut({isHiddenDesktop, doLogout}: Props) {
    return (
        <div className={`navbar-item ${isHiddenDesktop ? 'is-hidden-desktop' : ''}`}>
            <a className="button is-white" onClick={doLogout}>
                {isHiddenDesktop || <span>Sign Out</span>}
                <span className="icon">
                    <i className="fa fa-sign-out"/>
                </span>
            </a>
        </div>
    );
}
