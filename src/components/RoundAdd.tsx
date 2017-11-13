import * as React from 'react';
import * as Icons from 'react-feather';

interface Props {
    onAdd(): void;
}

export default function(props: Props) {
    return (
        <div className="field has-text-centered">
            <a className="button is-primary is-rounded is-size-5" onClick={props.onAdd}>
                <span className="icon is-small">
                  <Icons.Plus/>
                </span>
            </a>
        </div>
    );
}