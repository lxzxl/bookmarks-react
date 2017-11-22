import * as React from 'react';
import * as Icons from 'react-feather';
import capitalize from 'lodash/capitalize';
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
                        <a className="link button is-primary" href={bookmark.url} onClick={this.handleClick}
                           target="blank">
                            <span className="icon"><BookmarkIcon bookmark={bookmark}/></span>
                            <span>{bookmark.name}</span>
                        </a>
                        {isEditMode && <Action bookmark={bookmark}/>}
                    </div>
                </div>
            </div>
        );
    }
}
