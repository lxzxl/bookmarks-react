import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from '../components/Modal';
import {Rules, InputField as Input} from '../components/InputField';

interface Props {
    bookmark: BookmarkModel;
    onClose?: () => void;
    onCancel?: () => void;
    onSave(bookmark: BookmarkModel): void;
}

interface State extends BookmarkModel {
}

export class BookmarkModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = Object.assign({}, this.props.bookmark);
    }

    beforeSave = () => {
        const {onSave} = this.props;
        console.log(this.state);
        onSave(this.state);
    }

    handleChangeFor = (propertyName: keyof State) => (event: React.SyntheticEvent<HTMLInputElement>) => {
        /* tslint:disable: no-any */
        this.setState({[propertyName as any]: event.currentTarget.value});
    }

    render() {
        const {onCancel, onClose} = this.props;
        return (
            <Modal.Container title="Edit" classNames="bookmark" onSave={this.beforeSave} onCancel={onCancel}
                             onClose={onClose}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <Input val={this.state.name} handleChange={this.handleChangeFor('name')}
                               rules={[Rules.Required]}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={this.state.url} handleChange={this.handleChangeFor('url')}
                               rules={[Rules.Required]}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Name</label>
                    </div>
                    <div className="field-body">
                        <Input val={this.state.iconName} handleChange={this.handleChangeFor('iconName')}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={this.state.iconUrl} handleChange={this.handleChangeFor('iconUrl')}/>
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