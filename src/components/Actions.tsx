import * as React from 'react';

interface Props {
    isEditMode: boolean;
    handleClick: () => void;
}

export default function ({isEditMode = false, handleClick}: Props) {
    return (
        <div className="Actions field is-grouped">
            {!isEditMode ?
                <a className="button is-white">
                    <span className="icon" onClick={handleClick}><i className="fa fa-cog"/></span>
                </a>
                :
                <div className="field is-grouped">
                    <a className="button is-white">
                        <span className="icon has-text-success" onClick={handleClick}>
                            <i className="fa fa-floppy-o"/>
                        </span>
                    </a>
                    <a className="button is-white">
                        <span className="icon has-text-danger" onClick={handleClick}>
                            <i className="fa fa-trash"/>
                        </span>
                    </a>
                    <a className="button is-white">
                        <span className="icon" onClick={handleClick}><i className="fa fa-close"/></span>
                    </a>
                </div>
            }
        </div>

    );
}
