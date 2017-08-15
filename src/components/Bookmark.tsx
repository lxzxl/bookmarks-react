import * as React from 'react';

export default class Bookmark extends React.Component<{}, {}> {
    render() {
        return (
            <div className="column is-one-third-tablet is-one-quarter-desktop">
                <a className="button is-primary">
                    <span className="icon"><i className="fa fa-twitter"/></span>
                    <span>Twitter</span>
                </a>
            </div>
        );
    }
}
