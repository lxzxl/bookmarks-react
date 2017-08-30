import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Header extends React.Component<{}, {}> {
    render() {
        const {children} = this.props;
        return (
            <header className="card-header">
                <span className="card-header-title">
                    {children}
                </span>
            </header>
        );
    }
}

export class Body extends React.Component<{}, {}> {
    render() {
        const {children} = this.props;
        return (
            <div className="card-content">
                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}

interface FooterProps {
    onSave?: () => void;
    onCancel?: () => void;
}

export class Footer extends React.Component<FooterProps, {}> {
    onSave = () => {
        return this.props.onSave && this.props.onSave();
    }
    onCancel = () => {
        return this.props.onCancel && this.props.onCancel();
    }

    render() {
        return (
            <footer className="card-footer">
                <a className="card-footer-item has-text-success" onClick={this.onSave}>OK</a>
                <a className="card-footer-item has-text-dark" onClick={this.onCancel}>Cancel</a>
            </footer>
        );
    }
}

export interface Props {
    title?: string;
    classNames?: string;
    hideFooter?: true;
    onSave?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    autoClose?: false;
}

export class Container extends React.Component<Props, {}> {
    onSave = () => {
        const {onSave} = this.props;
        if (onSave) {
            onSave();
        }
        this.close();
    }

    onCancel = () => {
        const {onCancel} = this.props;
        if (onCancel) {
            onCancel();
        }
        this.close();
    }

    close = () => {
        const {autoClose = true, onClose} = this.props;
        if (autoClose && onClose) {
            onClose();
        }
    }

    render() {
        const {title, classNames, hideFooter, children} = this.props;
        return (
            <div className={`modal is-active ${classNames}`}>
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="card">
                        <Header>{title}</Header>
                        <Body>{children}</Body>
                        {hideFooter || <Footer onSave={this.onSave} onCancel={this.onCancel}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export interface ShowOption extends Props {
    divId?: string;
    divClass?: string;
    content?: string | React.Component;
}

export function show(options: ShowOption) {
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

    ReactDOM.render(<Container onClose={close} {...options} >{content}</Container>, divTarget);
}
