import * as React from 'react';
import * as Icons from 'react-feather';
import clone from 'lodash/clone';
import {CollectionsApi} from '../api/index';
import Actions, {ActionType} from '../components/Actions';
import Bookmark from './Bookmark';
import {show as createBookmarkModal} from './BookmarkModal';

interface Props {
    path: string;
    collection: CollectionSchema;
}

interface State {
    isEditMode: boolean;
    collection: CollectionData;
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
        this.state = {
            isEditMode: false,
            collection: this.getInitCollection()
        };
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
        const {title, bookmarks} = this.state.collection;
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
                            [...bookmarks].map((bookmark) => {
                                return <Bookmark key={bookmark.url} bookmark={bookmark} isEditMode={isEditMode}
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
            collection: {
                title: val,
                bookmarks: prevState.collection.bookmarks
            }
        }));
    }

    handleAction = async (action: ActionType) => {
        this.setState({
            isEditMode: !this.state.isEditMode
        });

        const {path} = this.props;
        switch (action) {
            case ActionType.Save: // sync save to api
                await CollectionsApi.update(path, this.state.collection);
                break;
            case ActionType.Delete: // sync delete to api.
                await CollectionsApi.remove(path);
                break;
            default:
                this.setState({
                    collection: this.getInitCollection()
                });
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
            const {bookmarks: oldBookmarks, newBookmarks} = prevState.collection;
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
            const oldBookmarks = prevState.collection.bookmarks;
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
