import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from '../components/Modal';

interface Props {
    title?: string;
    message: string;
    onConfirm(): void;
    onCancel(): void;
}

export class Confirm extends React.Component<Props, {}> {
    onConfirm = () => {
        this.props.onConfirm();
        this.close();
    }

    onCancel = () => {
        this.props.onCancel();
        this.close();
    }

    close = () => {
        const target = document.getElementById('react-confirm-confirm');
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
        document.body.children[0].classList.remove('react-confirm');
    }

    render() {
        const {title = 'Confirm', children} = this.props;

        return (
            <Modal.Container title={title} onSave={this.onConfirm} onCancel={this.onCancel}>
                {children}
            </Modal.Container>
        );
    }
}

export function showConfirm(options: Props) {
    document.body.children[0].classList.add('react-confirm');
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-confirm';
    document.body.appendChild(divTarget);
    ReactDOM.render(<Confirm {...options} >{options.message}</Confirm>, divTarget);
}