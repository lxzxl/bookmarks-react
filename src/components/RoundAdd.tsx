import * as React from 'react';
import * as Icons from 'react-feather';

interface Props {
    color?: Bulma.Colors;
    onAdd(): void;
}

export default function(props: Props) {
    const {color = 'info'} = props;
    return (
        <div className="field has-text-centered">
            <a className={`button is-rounded is-size-5 is-${color}`} onClick={props.onAdd}>
                <span className="icon is-small">
                  <Icons.Plus/>
                </span>
            </a>
        </div>
    );
}