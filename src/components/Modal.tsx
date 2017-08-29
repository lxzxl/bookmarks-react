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
                <a className="card-footer-item has-text-success" onClick={this.onSave}>Yes</a>
                <a className="card-footer-item has-text-dark" onClick={this.onCancel}>Cancel</a>
            </footer>
        );
    }
}

interface Props {
    title?: string;
    classNames?: string;
    hideFooter?: true;
    onSave?: () => void;
    onCancel?: () => void;
    autoClose?: false;
}

export class Container extends React.Component<Props, {}> {
    onSave = () => {
        if (this.props.onSave) {
            this.props.onSave();
        }
        if (this.props.autoClose) {
            this.close();
        }
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        if (this.props.autoClose) {
            this.close();
        }
    }
    close = () => {
        const target = document.getElementById('react-modal');
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
        document.body.children[0].classList.remove('react-modal');
    }

    render() {
        const {title, classNames, hideFooter, children, onSave, onCancel} = this.props;
        return (
            <div className={`modal is-active ${classNames}`}>
                <div className="modal-background"/>
                <div className="modal-content">
                    <div className="card">
                        <Header>{title}</Header>
                        <Body>{children}</Body>
                        {hideFooter || <Footer onSave={onSave} onCancel={onCancel}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export function showModal(options: Props) {
    document.body.children[0].classList.add('react-modal');
    const divTarget = document.createElement('div');
    divTarget.id = `react-modal-${Math.random()}`;
    document.body.appendChild(divTarget);
    ReactDOM.render(<Container {...options} />, divTarget);
}