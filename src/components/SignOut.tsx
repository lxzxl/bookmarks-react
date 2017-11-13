import * as React from 'react';
import * as Icons from 'react-feather';

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
                    <Icons.LogOut />
                </span>
            </a>
        </div>
    );
}
