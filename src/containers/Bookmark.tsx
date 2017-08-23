import * as React from 'react';
import {createConfirm} from '../components/Confirm';

interface ActionProps {
}

function Action(props: ActionProps) {
    const remove = () => {
        createConfirm({
            message: 'Are you sure to remove this bookmark?',
            onConfirm() {
                console.log('confirm');
            },
            onCancel() {
                console.log('cancel');
            }
        });
    };

    return (
        <div className="actions field has-addons">
            <div className="edit control">
                <a className=" button is-info">
                    <span className="icon"><i className="fa fa-pencil"/></span>
                </a>
            </div>
            <div className="remove control">
                <a className="button is-danger" onClick={remove}>
                    <span className="icon"><i className="fa fa-trash"/></span>
                </a>
            </div>
        </div>
    );
}

interface Props {
    url: string;
    name: string;
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
        const {url, name, isEditMode} = this.props;
        return (
            <div className="Bookmark column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                <div className="wrapper">
                    <div className="bookmark-link field has-addons has-addons-centered is-marginless">
                        <a className="link button is-primary" href={url} onClick={this.handleClick}>
                            <span className="icon"><i className="fa fa-twitter"/></span>
                            <span>{name}</span>
                        </a>
                        {isEditMode && <Action/>}
                    </div>
                </div>
            </div>
        );
    }
}
