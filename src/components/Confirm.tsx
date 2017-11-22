import * as React from 'react';
import omit from 'lodash/omit';
import * as Modal from '../components/Modal';

interface Props {
    title?: string;
    message: string;
    classNames?: string;
    hideFooter?: true;
    onConfirm(): void;
    onCancel(): void;
}

export class Confirm extends React.Component<Props, {}> {
    render() {
        const {title = 'Confirm', onConfirm, onCancel, children} = this.props;

        return (
            <Modal.Container title={title} onSave={onConfirm} onCancel={onCancel} {...this.props}>
                {children}
            </Modal.Container>
        );
    }
}

export function show(options: Props) {
    const {title = 'Confirm', message, onConfirm} = options;
    const modalOptions: Modal.ShowOption = {
        divId: 'react-confirm',
        divClass: 'react-confirm',
        title,
        content: message,
        onSave: onConfirm,
        ...omit(options, ['message', 'onConfirm'])
    };
    Modal.show(modalOptions);
}
