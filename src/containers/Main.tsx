import * as React from 'react';
import Collection from './Collection';
import RoundAdd from '../components/RoundAdd';
import Notification from '../components/Notification';

export default class Main extends React.Component<{}, {}> {
    onAdd = () => {
        Notification.success('test components Notification');
    }

    render() {
        const bookmarks1 = [
            {
                name: 'Twitter',
                url: 'http://twitter.com',
                iconName: 'Twitter',
                iconUrl: 'https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png'
            }
        ];
        const bookmarks2 = [
            {
                name: 'Facebook',
                url: 'http://facebook.com',
                iconName: 'Facebook',
                iconUrl: ''
            }
        ];
        return (
            <section className="Main section">
                <div className="container">
                    <Collection title="Popular" bookmarks={bookmarks1}/>
                    <Collection title="Work" bookmarks={bookmarks2}/>
                    <RoundAdd color="info" onAdd={this.onAdd}/>
                </div>
            </section>
        );
    }
}
