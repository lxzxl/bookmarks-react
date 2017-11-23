import * as React from 'react';

interface Props {
    isRequired?: boolean;

    val: string;
    handleChange(event: React.SyntheticEvent<HTMLInputElement>): void;
}

interface State {
    hasError: boolean;
}

export class InputField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return true;
    }

    render() {
        const {val, isRequired} = this.props;
        const {hasError} = this.state;
        const errorCLass = hasError && 'is-danger' || '';
        return (
            <div className="field">
                <div className="control">
                    <input className={`input ${errorCLass}`} type="text" name={name} value={val}
                           onChange={this.handleChange}/>
                </div>
                {isRequired && <p className={`help ${errorCLass}`}>
                    This field is required
                </p>}
            </div>
        );
    }

    handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (this.props.isRequired) {
            this.setState({hasError: !e.currentTarget.value});
        }

        this.props.handleChange(e);
    }
}