import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Icons from 'react-feather';
import findKey from 'lodash/findKey';
import pick from 'lodash/pick';
import * as Modal from '../components/Modal';
import {Rules, InputField as Input} from '../components/InputField';

const IconNamesMapping: { [K in Icons]: string } = {};
Object.keys(Icons).forEach(iconName => {
    IconNamesMapping[iconName] = iconName.toLowerCase();
});

interface Props {
    bookmark: BookmarkModel;
    onClose?(): void;
    onCancel?(): void;
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
        onSave(pick(this.state, ['id', 'name', 'url', 'iconName', 'useIconName', 'iconUrl']));
    }

    render() {
        const {onCancel, onClose} = this.props;
        const {name, url, iconName, useIconName, iconUrl} = this.state;
        const FoundIcon = iconName in Icons ? Icons[iconName] : null;
        return (
            <Modal.Container title="Edit" classNames="BookmarkModal bookmark"
                             onSave={this.beforeSave} onCancel={onCancel} onClose={onClose}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Name</label>
                    </div>
                    <div className="field-body">
                        <Input val={name}
                               handleChange={this.handleChangeFor('name')} rules={[Rules.Required]}/>
                        {FoundIcon &&
                        (<label className="checkbox field-label is-normal icon-checkbox">
                            <input type="checkbox" defaultChecked={!!useIconName}
                                   onChange={this.checkIcon}/> Use Icon {<FoundIcon/>}
                        </label>)
                        }
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={url} handleChange={this.handleChangeFor('url')}
                               rules={[Rules.Required]}/>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Icon Url</label>
                    </div>
                    <div className="field-body">
                        <Input val={iconUrl} handleChange={this.handleChangeFor('iconUrl')}/>
                    </div>
                </div>
            </Modal.Container>
        );
    }

    handleChangeFor = (propertyName: keyof BookmarkModel): React.ChangeEventHandler<HTMLInputElement> => (event) => {
        const value = event.target.value;
        /* tslint:disable:no-any */
        this.setState({[propertyName as any]: value});
        if (propertyName === 'name') {
            const searchName = (value || '').toLowerCase();
            const foundName = findKey(IconNamesMapping, n => n === searchName);
            this.setState({
                iconName: foundName || ''
            });
            if (!foundName) {
                this.setState({
                    useIconName: false
                });
            }
        }
    }

    checkIcon: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.checked;
        this.setState({useIconName: value});
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