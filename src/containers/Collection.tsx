import * as React from 'react';
import * as Icons from 'react-feather';
import Actions from '../components/Actions';
import Bookmark from './Bookmark';
import {show as createBookmarkModal} from './BookmarkModal';

interface Props {
    title: string;
}

interface State {
    isEditMode: boolean;
    bookmarks: BookmarkModel[];
}

function Add(props: { onAdd(): void; }) {
    return (
        <div className="Bookmark column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
            <div className="wrapper">
                <div className="field has-text-centered">
                    <a className="button is-info" onClick={props.onAdd}>
                        <span className="icon is-small">
                          <Icons.Plus/>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
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
    handleAdd = () => {
        createBookmarkModal({
            bookmark: {
                id: '',
                name: '',
                url: '',
                iconUrl: ''
            },
            onSave: () => {
                this.setState((prevState: State, props: Props) => ({
                        bookmarks: [...prevState.bookmarks, {
                            id: 'b-2',
                            name: 'Twitter2',
                            url: 'http://twitter2.com',
                            iconUrl: ''
                        }]
                    })
                );
            }
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
                            <span className="icon"><Icons.Book/></span>
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
                        {isEditMode && <Add onAdd={this.handleAdd}/>}
                    </div>
                </div>
            </div>
        );
    }
}
