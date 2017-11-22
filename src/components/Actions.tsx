import * as React from 'react';
import * as Icons from 'react-feather';

export enum ActionType {
    None = 0,
    Save = 1,
    Delete = -1,
}

interface Props {
    isEditMode: boolean;
    handleAction: (action: ActionType) => void;
}

export default function({isEditMode = false, handleAction}: Props) {
    return (
        <div className="Actions field is-grouped">
            {!isEditMode ?
                <a className="button is-white" onClick={e => handleAction(0)}>
                    <span className="icon"><Icons.Settings size={16}/></span>
                </a>
                :
                <div className="field is-grouped">
                    <a className="button is-white" onClick={e => handleAction(1)}>
                        <span className="icon has-text-success"><Icons.Save size={16}/></span>
                    </a>
                    <a className="button is-white" onClick={e => handleAction(-1)}>
                        <span className="icon has-text-danger"><Icons.Trash2 size={16}/></span>
                    </a>
                    <a className="button is-white" onClick={e => handleAction(0)}>
                        <span className="icon"><Icons.X size={16}/></span>
                    </a>
                </div>
            }
        </div>

    );
}
