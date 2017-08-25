import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Modal extends React.Component<{}, {}> {
    close = () => {
        const target = document.getElementById('react-modal');
        if (target && target.parentNode) {
            target.parentNode.removeChild(target);
        }
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-content">
                    test
                </div>
            </div>
        );
    }
}

export function showModal(options: {}) {
    document.body.children[0].classList.add('react-modal');
    const divTarget = document.createElement('div');
    divTarget.id = `react-modal-${Math.random()}`;
    document.body.appendChild(divTarget);
    ReactDOM.render(<Modal {...options} />, divTarget);
}