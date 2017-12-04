import * as React from 'react';
import pick from 'lodash/pick';

export enum Rules {
    Required
}

type validator = () => boolean;

const InputFields = ['value', 'name', 'type', 'placeholder'];

type InputProps = {
    value: string;
    name?: string;
    type?: string;
    placeholder?: string;
};

interface Props extends InputProps {
    hasError?: boolean;
    fieldClass?: string;
    controlClass?: string;
    PreIcon?: React.SFC;
    suffixIcon?: React.SFC;
    rules?: Array<Rules>;
    validators?: Array<validator>;

    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

    triggerValidate?: boolean;
    setValidateStatus?(isValid: boolean): void;
}

interface State {
    hasError: boolean;
}

export class InputField extends React.Component<Props, State> {
    private isRequired: boolean;

    constructor(props: Props) {
        super(props);
        const { rules = [] } = this.props;
        this.state = {
            hasError: false
        };
        this.isRequired = rules.indexOf(Rules.Required) > -1;
    }

    checkIsValid(): boolean {
        const value = this.props.value;
        let isValid = true;
        if (this.isRequired && !value) {
            isValid = false;
        }
        this.setState({
            hasError: !isValid
        });
        return isValid;
    }

    render() {
        const { fieldClass, controlClass, PreIcon, suffixIcon } = this.props;
        const { type = 'text', ...inputProps } = pick(this.props, InputFields);
        const { hasError } = this.state;
        const errorCLass = (hasError && 'is-danger') || '';
        return (
            <div className={`field ${fieldClass || ''}`}>
                <div className={`control  ${controlClass || ''}`}>
                    <input
                        className={`input ${errorCLass}`}
                        type={type}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        {...inputProps}
                    />
                    {PreIcon && (
                        <span className="icon is-small is-left">
                            {<PreIcon />}
                        </span>
                    )}
                    {suffixIcon && (
                        <span className="icon is-small is-right">
                            {suffixIcon}
                        </span>
                    )}
                </div>
                {this.isRequired && (
                    <p className={`help ${errorCLass}`}>
                        This field is required
                    </p>
                )}
            </div>
        );
    }

    handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        if (this.props.handleChange) {
            this.props.handleChange(event);
        }

        if (this.props.setValidateStatus) {
            this.props.setValidateStatus(this.checkIsValid());
        }
    };

    handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (this.props.handleKeyUp) {
            this.props.handleKeyUp(event);
        }
        this.checkIsValid();
        if (this.props.setValidateStatus) {
            this.props.setValidateStatus(this.checkIsValid());
        }
    };
}
