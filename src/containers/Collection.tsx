import * as React from 'react';
import Bookmark from '../components/Bookmark';

export default class Collection extends React.Component<{}, {}> {
    render() {
        return (
            <div className="box collection">
                <p className="title is-4">Wide tile</p>
                <div className="content">
                    <div className="columns is-multiline">
                        <Bookmark/>
                        <Bookmark/>
                        <Bookmark/>
                        <Bookmark/>
                    </div>
                </div>
            </div>
        );
    }
}
