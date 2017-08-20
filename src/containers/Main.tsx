import * as React from 'react';
import Collection from './Collection';

export default class Main extends React.Component<{}, {}> {
    render() {
        return (
            <section className="Main section">
                <div className="container">
                    <Collection title="Popular"/>
                    <Collection title="Work"/>
                </div>
            </section>
        );
    }
}
