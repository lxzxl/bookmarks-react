import * as React from 'react';

const logo = require('../logo.svg');

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React</h2>
            </div>
        );
    }
}