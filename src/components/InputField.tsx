import * as React from 'react';

export enum Rules {
    Required
}

type validator = () => boolean;

interface Props {
    classNames?: string;
    rules?: Array<Rules>;
    validators?: Array<validator>;

    val: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface State {
    hasError: boolean;
}

export class InputField extends React.Component<Props, State> {
    private isRequired: boolean;

    constructor(props: Props) {
        super(props);
        const {rules = []} = this.props;
        this.state = {
            hasError: false
        };
        this.isRequired = rules.indexOf(Rules.Required) > -1;
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return true;
    }

    render() {
        const {classNames, val} = this.props;
        const {hasError} = this.state;
        const errorCLass = hasError && 'is-danger' || '';
        return (
            <div className={`field ${classNames || ''}`}>
                <div className="control">
                    <input className={`input ${errorCLass}`} type="text" name={name} value={val}
                           onChange={this.handleChange}/>
                </div>
                {this.isRequired && <p className={`help ${errorCLass}`}>
                    This field is required
                </p>}
            </div>
        );
    }

    handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (this.isRequired) {
            this.setState({hasError: !event.target.value});
        }

        this.props.handleChange(event);
    }
}