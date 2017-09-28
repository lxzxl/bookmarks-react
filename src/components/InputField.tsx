import * as React from 'react';

interface Props {
    defaultVal?: string;
}

interface State {
    value: string;
    hasError: boolean;
}

export class InputField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            hasError: false
        };
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return true;
    }

    render() {
        const {defaultVal} = this.props;
        const {hasError} = this.state;
        const errorCLass = hasError && 'is-danger' || '';
        return (
            <div className="field">
                <div className="control">
                    <input className={`input ${errorCLass}`} type="text" defaultValue={defaultVal}/>
                </div>
                <p className={`help ${errorCLass}`}>
                    This field is required
                </p>
            </div>
        );
    }
}