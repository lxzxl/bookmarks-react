import * as React from 'react';
import Actions from '../components/Actions';
import Bookmark from './Bookmark';

interface Props {
    title: string;
}

interface State {
    isEditMode: boolean;
    bookmarks: BookmarkModel[];
}

export default class Collection extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false,
            bookmarks: [
                {
                    id: 'b-1',
                    name: 'Twitter',
                    url: 'http://twitter.com',
                    iconUrl: ''
                }
            ],
        };
    }

    handleClick = () => {
        this.setState({
            isEditMode: !this.state.isEditMode
        });
    }

    render() {
        let isEditMode = this.state.isEditMode;
        const {bookmarks} = this.state;
        return (
            <div className="box Collection">
                <div className="level is-mobile">
                    <div className="level-left">
                        <p className="title is-4">
                            <span className="icon"><i className="fa fa-bookmark"/></span>
                            <span>{this.props.title}</span>
                        </p>
                    </div>
                    <div className="level-right edit">
                        <Actions isEditMode={isEditMode} handleClick={this.handleClick}/>
                    </div>
                </div>
                <div className="content">
                    <div className="columns is-mobile is-multiline">
                        {
                            bookmarks.map((bookmark) => {
                                return <Bookmark key={bookmark.id} bookmark={bookmark} isEditMode={isEditMode}/>;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
