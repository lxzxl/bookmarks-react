import * as React from 'react';
import * as Icons from 'react-feather';
import clone from 'lodash/clone';
import Actions, {ActionType} from '../components/Actions';
import Bookmark from './Bookmark';
import {show as createBookmarkModal} from './BookmarkModal';

interface Props {
    title: string;
    bookmarks: BookmarkModel[];
}

interface State extends Props {
    isEditMode: boolean;
}

function AddBookmark(props: { onAdd(): void; }) {
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
    private titleInput: HTMLInputElement;

    constructor(props: Props) {
        super(props);
        const {bookmarks = [], title} = this.props;
        this.state = {
            isEditMode: false,
            title,
            bookmarks: clone(bookmarks),
        };
    }

    render() {
        let isEditMode = this.state.isEditMode;
        const {bookmarks} = this.state;
        return (
            <div className="box Collection">
                <div className="level is-mobile">
                    <div className="level-left">
                        {
                            isEditMode ?
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input className="input" type="text" placeholder={this.props.title}
                                               ref={(input: HTMLInputElement) => this.titleInput = input}/>
                                        <span className="icon is-small is-left"><Icons.Book/></span>
                                    </p>
                                </div>
                                :
                                <p className="title is-4">
                                    <span className="icon"><Icons.Book/></span>
                                    <span>{this.props.title}</span>
                                </p>
                        }
                    </div>
                    <div className="level-right edit">
                        <Actions isEditMode={isEditMode} handleAction={this.handleAction}/>
                    </div>
                </div>
                <div className="content">
                    <div className="columns is-mobile is-multiline">
                        {
                            bookmarks.map((bookmark) => {
                                return <Bookmark key={bookmark.url} bookmark={bookmark} isEditMode={isEditMode}
                                                 onSave={this.saveBookmark}/>;
                            })
                        }
                        {isEditMode && <AddBookmark onAdd={this.addBookmark}/>}
                    </div>
                </div>
            </div>
        );
    }

    handleAction = (action: ActionType) => {
        console.log(action);
        this.setState({
            isEditMode: !this.state.isEditMode
        });
    }

    addBookmark = () => {
        createBookmarkModal({
            bookmark: {
                name: '',
                url: '',
                iconName: '',
                iconUrl: ''
            },
            onSave: this.saveBookmark
        });
    }

    saveBookmark = (bookmark: BookmarkModel) => {
        this.setState((prevState: State) => {
            const oldBookmarks = prevState.bookmarks;
            let newBookmarks;
            if (bookmark.id) {
                newBookmarks = oldBookmarks.map(b => {
                    return b.id === bookmark.id ? bookmark : b;
                });
            } else {
                newBookmarks = [...oldBookmarks, bookmark];
            }
            return {
                bookmarks: newBookmarks
            };
        });
    }
}
