import * as React from 'react';

interface Props {
    isEditMode: boolean;
    handleClick: () => void;
}

export default function ({isEditMode = false, handleClick}: Props) {
    return (
        <div className="Actions field is-grouped">
            {!isEditMode ?
                <a className="button is-white" onClick={handleClick}>
                    <span className="icon"><i className="fa fa-cog"/></span>
                </a>
                :
                <div className="field is-grouped">
                    <a className="button is-white" onClick={handleClick}>
                        <span className="icon has-text-success"><i className="fa fa-floppy-o"/></span>
                    </a>
                    <a className="button is-white" onClick={handleClick}>
                        <span className="icon has-text-danger"><i className="fa fa-trash"/></span>
                    </a>
                    <a className="button is-white" onClick={handleClick}>
                        <span className="icon"><i className="fa fa-close"/></span>
                    </a>
                </div>
            }
        </div>

    );
}
