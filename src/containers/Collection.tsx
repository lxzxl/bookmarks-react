import * as React from 'react';
import * as Icons from 'react-feather';
import clone from 'lodash/clone';
import {CollectionsApi} from '../api/index';
import Actions, {ActionType} from '../components/Actions';
import Notification from '../components/Notification';
import Bookmark from './Bookmark';
import {show as createBookmarkModal} from './BookmarkModal';

interface Props {
    path: string;
    collection: CollectionSchema;
}

interface State extends CollectionData {
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
    constructor(props: Props) {
        super(props);
        this.state = Object.assign(
            {
                isEditMode: false,
            },
            this.getInitCollection()
        );
    }

    getInitCollection(): CollectionData {
        const {bookmarks = [], title} = this.props.collection;
        return {
            title,
            bookmarks: clone(bookmarks),
            newBookmarks: []
        };
    }

    render() {
        let isEditMode = this.state.isEditMode;
        const {title: initTitle} = this.props.collection;
        const {title, bookmarks, newBookmarks} = this.state;
        return (
            <div className="box Collection">
                <div className="level is-mobile">
                    <div className="level-left">
                        {
                            isEditMode ?
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input className="input" type="text" placeholder={initTitle}
                                               value={title} onChange={this.handleTitleChange}/>
                                        <span className="icon is-small is-left"><Icons.Book/></span>
                                    </p>
                                </div>
                                :
                                <p className="title is-4">
                                    <span className="icon"><Icons.Book/></span>
                                    <span>{title}</span>
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
                            [...bookmarks, ...newBookmarks].map((bookmark) => {
                                return <Bookmark key={bookmark.id} bookmark={bookmark} isEditMode={isEditMode}
                                                 onSave={this.saveBookmark} onDelete={this.deleteBookmark}/>;
                            })
                        }
                        {isEditMode && <AddBookmark onAdd={this.addBookmark}/>}
                    </div>
                </div>
            </div>
        );
    }

    handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const val = event.target.value;
        this.setState((prevState) => ({
            title: val,
            bookmarks: prevState.bookmarks
        }));
    }

    handleAction = async (action: ActionType) => {
        this.setState({
            isEditMode: !this.state.isEditMode
        });

        const {path} = this.props;
        switch (action) {
            case ActionType.Save: // sync save to api
                const collection: CollectionSchema = {
                    title: this.state.title,
                    bookmarks: this.state.bookmarks.concat(this.state.newBookmarks)
                };
                await CollectionsApi.update(path, collection);
                Notification.success('Collections updated!');
                break;
            case ActionType.Delete: // sync delete to api.
                await CollectionsApi.remove(path);
                Notification.success('Collections deleted!');
                break;
            default:
                this.setState(this.getInitCollection());
        }
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
            const {bookmarks: oldBookmarks, newBookmarks} = prevState;
            // modify bookmark
            if (bookmark.id) {
                return {
                    bookmarks: oldBookmarks.map(b => {
                        return b.id === bookmark.id ? bookmark : b;
                    })
                };
            }
            // new added bookmark
            bookmark.id = Date.now();
            return {
                newBookmarks: [...newBookmarks, bookmark]
            };
        });
    }

    deleteBookmark = (bookmark: BookmarkModel) => {
        this.setState((prevState: State) => {
            if (!bookmark.id) {
                return;
            }
            const oldBookmarks = prevState.bookmarks;
            let newBookmarks;
            if (bookmark.id) {
                newBookmarks = oldBookmarks.filter(b => {
                    return b.id !== bookmark.id;
                });
            }
            return {
                bookmarks: newBookmarks
            };
        });
    }
}
