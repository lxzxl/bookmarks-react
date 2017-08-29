import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from '../components/Modal';

interface Props {
    onSave(): void;
    onCancel(): void;
}

export class BookmarkModal extends React.Component<Props, {}> {
    onSave = () => {
        this.props.onSave();
        this.close();
    }
    onCancel = () => {
        this.props.onCancel();
        this.close();
    }

    close = () => {
        const target = document.getElementById('react-modal-bookmark');
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
        document.body.children[0].classList.remove('bookmark-modal');
    }

    render() {
        return (
            <Modal.Container title="Edit" classNames="bookmark" onSave={this.onSave} onCancel={this.onCancel}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Url</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Url</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Container>
        );
    }
}

export function createBookmarkModal(options: Props) {
    document.body.children[0].classList.add('bookmark-modal');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-modal-bookmark';
    document.body.appendChild(divTarget);
    ReactDOM.render(<BookmarkModal {...options} />, divTarget);
}