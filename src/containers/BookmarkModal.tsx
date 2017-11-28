import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Icons from 'react-feather';
import findKey from 'lodash/findKey';
import * as Modal from '../components/Modal';
import {Rules, InputField as Input} from '../components/InputField';

const IconNamesMapping: { [K in Icons]: string } = {};
Object.keys(Icons).forEach(iconName => {
    IconNamesMapping[iconName] = iconName.toLowerCase();
});

interface Props {
    bookmark: BookmarkModel;
    onClose?: () => void;
    onCancel?: () => void;
    onSave(bookmark: BookmarkModel): void;
}

interface State {
    FoundIcon?: typeof Icons;
    bookmark: BookmarkModel;
}

export class BookmarkModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {bookmark: this.props.bookmark};
    }

    beforeSave = () => {
        const {onSave} = this.props;
        onSave(this.state.bookmark);
    }

    handleChangeFor = (propertyName: keyof BookmarkModel): React.ChangeEventHandler<HTMLInputElement> => (event) => {
        /* tslint:disable: no-any */
        const value = event.target.value;
        this.setState((prevState) => {
            const {bookmark} = prevState;
            return Object.assign({}, bookmark, {[propertyName as any]: value});
        });
        if (propertyName === 'name') {
            const searchName = (value || '').toLowerCase();
            const foundName = findKey(IconNamesMapping, n => n === searchName);
            this.setState({
                FoundIcon: foundName ? Icons[foundName] : undefined
            });
        }
    }

    render() {
        const {onCancel, onClose} = this.props;
        const {bookmark, FoundIcon} = this.state;
        return (
            <Modal.Container title="Edit" classNames="BookmarkModal bookmark"
                             onSave={this.beforeSave} onCancel={onCancel} onClose={onClose}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <Input val={bookmark.name}
                               handleChange={this.handleChangeFor('name')} rules={[Rules.Required]}/>
                        {FoundIcon && <label className="checkbox field-label is-normal icon-checkbox">
                            <input type="checkbox"/> Use Icon {<FoundIcon/>}
                        </label>}
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={bookmark.url} handleChange={this.handleChangeFor('url')}
                               rules={[Rules.Required]}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={bookmark.iconUrl} handleChange={this.handleChangeFor('iconUrl')}/>
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