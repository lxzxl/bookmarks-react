import * as React from 'react';

interface Props {

}

interface State {
    hasError: boolean;
}

export class InputField extends React.Component<Props, State> {
    render() {
        return (
            <div className="field">
                <div className="control">
                    <input className="input is-danger" type="text" defaultValue={''}/>
                </div>
                <p className="help is-danger">
                    This field is required
                </p>
            </div>
        );
    }
}