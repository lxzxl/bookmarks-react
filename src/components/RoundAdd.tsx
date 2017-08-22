import * as React from 'react';

interface Props {
    onAdd(): void;
}

export default function (props: Props) {
    return (
        <div className="field has-text-centered">
            <a className="button is-primary is-rounded is-size-5" onClick={props.onAdd}>
                <span className="icon is-small">
                  <i className="fa fa-plus"/>
                </span>
            </a>
        </div>
    );
}