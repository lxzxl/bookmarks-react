import * as React from 'react';

interface Props {
    onSave(): void;
    onCancel(): void;
}

export default class BookmarkModal extends React.Component<Props, {}> {
    render() {
        const {onSave, onCancel} = this.props;
        return (
            <div className="modal is-active">
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