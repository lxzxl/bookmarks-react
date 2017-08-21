import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    title: string;
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
        const {title, message} = this.props;
        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                        <button className="delete" aria-label="close"/>
                    </header>
                    <section className="modal-card-body">
                        {message}
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.clickConfirm}>Yes</button>
                        <button className="button" onClick={this.clickCancel}>Cancel</button>
                    </footer>
                </div>
            </div>
        );
    }
}

export function createConfirm(options: Props) {
    document.body.children[0].classList.add('react-confirm');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-confirm';
    document.body.appendChild(divTarget);
    ReactDOM.render(<Confirm {...options} />, divTarget);
}