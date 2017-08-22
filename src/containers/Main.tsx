import * as React from 'react';
import Collection from './Collection';
import RoundAdd from '../components/RoundAdd';

export default class Main extends React.Component<{}, {}> {
    onAdd = () => {
        console.log('add collection');
    }

    render() {
        return (
            <section className="Main section">
                <div className="container">
                    <Collection title="Popular"/>
                    <Collection title="Work"/>
                    <RoundAdd onAdd={this.onAdd}/>
                </div>
            </section>
        );
    }
}
