import * as React from 'react';

interface Props {
    isHiddenDesktop?: boolean;
}

export default function SignOut({isHiddenDesktop}: Props) {
    return (
        <div className={`navbar-item ${isHiddenDesktop ? 'is-hidden-desktop' : ''}`}>
            <a className="button is-white">
                {isHiddenDesktop || <span>Sign Out</span>}
                <span className="icon">
                    <i className="fa fa-sign-out"/>
                </span>
            </a>
        </div>
    );
}
