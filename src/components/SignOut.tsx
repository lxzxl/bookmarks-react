import * as React from 'react';

interface Props {
    isHiddenDesktop?: boolean;
}

export default function SignOut(props: Props) {
    return (
        <a className={`navbar-item ${props.isHiddenDesktop ? 'is-hidden-desktop' : ''}`}>
                <span className="icon is-small">
                    <i className="fa fa-sign-out"/>
                </span>
            <span>SignOut</span>
        </a>
    );
}
