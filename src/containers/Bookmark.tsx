import * as React from 'react';

interface Props {
    url: string;
    name: string;
}

interface State {
    isEditMode: boolean;
}

export default class Bookmark extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false
        };
    }

    render() {
        let {url, name} = this.props;
        let {isEditMode} = this.state;
        return (
            <div className="bookmark column is-flex is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                {isEditMode ?
                    <div className="actions">
                        test
                    </div>
                    :
                    <a className="link button is-primary has-addons" href={url}>
                        <span className="icon"><i className="fa fa-twitter"/></span>
                        <span>{name}</span>
                    </a>
                }
            </div>
        );
    }
}
