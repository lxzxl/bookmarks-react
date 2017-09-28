import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from '../components/Modal';
import {InputField as Input} from '../components/InputField';

interface Props {
    bookmark: BookmarkModel;
    onClose?: () => void;
    onCancel?: () => void;
    onSave(): void;
}

export class BookmarkModal extends React.Component<Props, {}> {
    render() {
        const {bookmark, onSave, onCancel, onClose} = this.props;
        return (
            <Modal.Container title="Edit" classNames="bookmark" onSave={onSave} onCancel={onCancel} onClose={onClose}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <Input defaultVal={bookmark.name}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Url</label>
                    </div>
                    <div className="field-body">
                        <Input defaultVal={bookmark.url}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Url</label>
                    </div>
                    <div className="field-body">
                        <Input defaultVal={bookmark.iconUrl}/>
                    </div>
                </div>
            </Modal.Container>
        );
    }
}

interface Option extends Props {
    divId?: string;
    divClass?: string;
    content?: string | React.Component;
}

export function show(options: Option) {
    const {divId = 'modal-bookmark', divClass = 'modal-bookmark', content} = options;
    document.body.children[0].classList.add(divId);
    const divTarget = document.createElement('div');
    divTarget.id = divClass;
    document.body.appendChild(divTarget);

    const close = () => {
        if (divTarget && divTarget.parentNode) {
            divTarget.parentNode.removeChild(divTarget);
        }
        document.body.children[0].classList.remove(divClass);
    };

    ReactDOM.render(<BookmarkModal onClose={close} {...options}>{content}</BookmarkModal>, divTarget);
}