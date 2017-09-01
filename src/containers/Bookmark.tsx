import * as React from 'react';
import {show as showConfirm} from '../components/Confirm';
import {show as createBookmarkModal} from './BookmarkModal';

interface ActionProps {
    bookmark: BookmarkModel;
}

class Action extends React.Component<ActionProps, {}> {
    remove = () => {
        showConfirm({
            message: 'Are you sure to remove this bookmark?',
            onConfirm() {
                console.log('confirm');
            },
            onCancel() {
                console.log('cancel');
            }
        });
    }

    edit = () => {
        createBookmarkModal({
            bookmark: this.props.bookmark,
            onSave() {
                console.log('save');
            },
            onCancel() {
                console.log('cancel');
            },
        });
    }

    render() {
        return (
            <div className="actions field has-addons">
                <div className="edit control">
                    <a className=" button is-info" onClick={this.edit}>
                        <span className="icon"><i className="fa fa-pencil"/></span>
                    </a>
                </div>
                <div className="remove control">
                    <a className="button is-danger" onClick={this.remove}>
                        <span className="icon"><i className="fa fa-trash"/></span>
                    </a>
                </div>
            </div>
        );
    }
}

interface Props {
    bookmark: BookmarkModel;
    isEditMode: boolean;
}

interface State {
    isShowAction: boolean;
}

export default class Bookmark extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isShowAction: false
        };
    }

    handleClick = (e: React.SyntheticEvent<EventTarget>) => {
        if (this.props.isEditMode) {
            e.preventDefault();
        }
    }

    render() {
        const {bookmark, isEditMode} = this.props;
        return (
            <div className="Bookmark column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <div className="wrapper">
                    <div className="bookmark-link field has-addons has-addons-centered is-marginless">
                        <a className="link button is-primary" href={bookmark.url} onClick={this.handleClick}>
                            <span className="icon"><i className="fa fa-twitter"/></span>
                            <span>{bookmark.name}</span>
                        </a>
                        {isEditMode && <Action bookmark={bookmark}/>}
                    </div>
                </div>
            </div>
        );
    }
}
