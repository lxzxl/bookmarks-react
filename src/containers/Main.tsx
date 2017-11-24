import * as React from 'react';
import Collection from './Collection';
import RoundAdd from '../components/RoundAdd';
import Notification from '../components/Notification';

export default class Main extends React.Component<{}, {}> {
    onAdd = () => {
        Notification.success('test components Notification');
    }

    render() {
        const collection1 = [
            {
                id: Date.now(),
                name: 'Twitter',
                url: 'http://twitter.com',
                iconName: 'Twitter',
                iconUrl: 'https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png'
            }
        ];
        const collection2 = [
            {
                id: Date.now(),
                name: 'Facebook',
                url: 'http://facebook.com',
                iconName: 'Facebook',
                iconUrl: ''
            }
        ];
        return (
            <section className="Main section">
                <div className="container">
                    <Collection title="Popular" bookmarks={collection1}/>
                    <Collection title="Work" bookmarks={collection2}/>
                    <RoundAdd color="info" onAdd={this.onAdd}/>
                </div>
            </section>
        );
    }
}
