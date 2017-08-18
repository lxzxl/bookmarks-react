import * as React from 'react';
import Bookmark from '../components/Bookmark';

interface Props {
    title: string;
}

interface State {
    isEditMode: boolean;
}

export default class Collection extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false
        };
    }

    handleClick = () => {
        this.setState({
            isEditMode: !this.state.isEditMode
        });
    }

    render() {
        let isEditMode = this.state.isEditMode;
        return (
            <div className="box Collection">
                <div className="level">
                    <div className="level-left">
                        <p className="title is-4">{this.props.title}</p>
                    </div>
                    <div className="level-right edit">
                        {isEditMode ?
                            <span className="icon is-medium" onClick={this.handleClick}>
                                <i className="fa fa-cog"/></span>
                            : <span className="icon is-medium" onClick={this.handleClick}>
                                <i className="fa fa-close"/></span>
                        }
                    </div>
                </div>
                <div className="content">
                    <div className="columns is-multiline">
                        <Bookmark/>
                        <Bookmark/>
                        <Bookmark/>
                        <Bookmark/>
                    </div>
                </div>
            </div>
        );
    }
}
