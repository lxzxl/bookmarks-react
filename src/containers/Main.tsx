import * as React from 'react';
import Collection from './Collection';

export default class Main extends React.Component<{}, {}> {
    render() {
        return (
            <section className="section main">
                <div className="container">
                    <Collection/>
                </div>
            </section>
        );
    }
}
