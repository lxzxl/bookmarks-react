import * as React from 'react';
import Notification from 'react-bulma-notification';
import {CollectionsApi} from '../api';
import Collection from './Collection';
import RoundAdd from '../components/RoundAdd';

interface Props {
}

interface State {
    collections: CollectionList<CollectionSchema>;
}

export default class Main extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collections: [],
        };
    }

    componentDidMount() {
        CollectionsApi.register((collections: CollectionList<CollectionSchema>) => {
            this.setState({
                collections
            });
        });
    }

    componentWillUnmount() {
        CollectionsApi.unregister();
    }

    render() {
        const {collections} = this.state;
        return (
            <section className="Main section">
                <div className="container">
                    {collections.map(({key, collection}) =>
                        <Collection key={key} path={key} collection={collection}/>
                    )}
                    <RoundAdd color="info" onAdd={this.onAdd}/>
                </div>
            </section>
        );
    }

    onAdd = () => {
        const newCollection: CollectionData = {
            title: 'test',
            bookmarks: [{
                id: Date.now(),
                name: 'Twitter',
                url: 'http://twitter.com',
                iconName: 'Twitter',
                iconUrl: 'https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png'
            }],
            newBookmarks: []
        };
        CollectionsApi.add(newCollection);

        Notification.success('New Collection Added');
    }
}
