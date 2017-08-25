import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    title?: string;
    message: string;
    onConfirm(): void;
    onCancel(): void;
}

export class Confirm extends React.Component<Props, {}> {
    clickConfirm = () => {
        this.props.onConfirm();
        this.close();
    }

    clickCancel = () => {
        this.props.onCancel();
        this.close();
    }

    close = () => {
        const target = document.getElementById('react-confirm-confirm');
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }

    render() {
        const {title = 'Confirm', message} = this.props;

        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <span className="card-header-title">
                                {title}
                            </span>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                {message}
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item has-text-success" onClick={this.clickConfirm}>Yes</a>
                            <a className="card-footer-item has-text-dark" onClick={this.clickCancel}>Cancel</a>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export function showConfirm(options: Props) {
    document.body.children[0].classList.add('react-confirm');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-confirm';
    document.body.appendChild(divTarget);
    ReactDOM.render(<Confirm {...options} />, divTarget);
}