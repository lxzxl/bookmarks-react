import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    onSave(): void;
    onCancel(): void;
}

export class BookmarkModal extends React.Component<Props, {}> {
    render() {
        const {onSave, onCancel} = this.props;
        return (
            <div className="bookmark modal is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <span className="card-header-title">
                                fasdf
                            </span>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                fasdf
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item has-text-success" onClick={onSave}>Save</a>
                            <a className="card-footer-item has-text-dark" onClick={onCancel}>Cancel</a>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export function createBookmarkModal(options: Props) {
    document.body.children[0].classList.add('bookmark-modal');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-bookmark-modal';
    document.body.appendChild(divTarget);
    ReactDOM.render(<BookmarkModal {...options} />, divTarget);
}