import * as React from 'react';
import * as Icons from 'react-feather';
import capitalize from 'lodash/capitalize';
import {show as showConfirm} from '../components/Confirm';
import {show as createBookmarkModal} from './BookmarkModal';

type handler = (bookmark: BookmarkModel) => void;

interface ActionProps {
    bookmark: BookmarkModel;
    onSave: handler;
    onDelete: handler;
}

class Action extends React.Component<ActionProps, {}> {
    remove = () => {
        const {bookmark} = this.props;
        showConfirm({
            message: 'Are you sure to remove this bookmark?',
            onConfirm: () => {
                this.props.onDelete(bookmark);
            },
            onCancel() {
                console.log('cancel');
            }
        });
    }

    edit = () => {
        createBookmarkModal({
            bookmark: this.props.bookmark,
            onSave: () => {
                this.props.onSave(this.props.bookmark);
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
                        <span className="icon"><Icons.Edit2/></span>
                    </a>
                </div>
                <div className="remove control">
                    <a className="button is-danger" onClick={this.remove}>
                        <span className="icon"><Icons.Trash2/></span>
                    </a>
                </div>
            </div>
        );
    }
}

function BookmarkIcon(props: { bookmark: BookmarkModel }) {
    const {bookmark} = props;
    if (bookmark.iconUrl) {
        return <img src={bookmark.iconUrl}/>;
    }
    const iconLookup = bookmark.iconName && capitalize(bookmark.iconName);
    if (iconLookup && iconLookup in Icons) {
        const Icon = Icons[iconLookup];
        return <Icon/>;
    }
    return (
        <Icons.Bookmark/>
    );
}

interface Props {
    bookmark: BookmarkModel;
    isEditMode: boolean;
    onSave: handler;
    onDelete: handler;
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
        const {bookmark, isEditMode, onSave, onDelete} = this.props;

        return (
            <div className="Bookmark column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <div className="wrapper">
                    <div className="bookmark-link field has-addons has-addons-centered is-marginless">
                        <a className="link button is-primary" href={bookmark.url} onClick={this.handleClick}
                           target="blank">
                            <span className="icon"><BookmarkIcon bookmark={bookmark}/></span>
                            <span>{bookmark.name}</span>
                        </a>
                        {isEditMode && <Action bookmark={bookmark} onSave={onSave} onDelete={onDelete}/>}
                    </div>
                </div>
            </div>
        );
    }
}
