import * as React from 'react';
import Actions from '../components/Actions';
import Bookmark from './Bookmark';

interface Link {
    url: string;
    name: string;
}

interface Props {
    title: string;
}

interface State {
    isEditMode: boolean;
    bookmarks: Link[];
}

export default class Collection extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false,
            bookmarks: [],
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
                <div className="level is-mobile">
                    <div className="level-left">
                        <p className="title is-4">
                            <span className="icon"><i className="fa fa-bookmark"/></span>
                            <span>{this.props.title}</span>
                        </p>
                    </div>
                    <div className="level-right edit">
                        <Actions isEditMode={isEditMode} handleClick={this.handleClick}/>
                    </div>
                </div>
                <div className="content">
                    <div className="columns is-mobile is-multiline">
                        <Bookmark name={'Twitter1'} url={'Twitter'}/>
                        <Bookmark name={'Twitter2'} url={'Twitter'}/>
                        <Bookmark name={'Twitter3'} url={'Twitter'}/>
                        <Bookmark name={'Twitter4'} url={'Twitter'}/>
                    </div>
                </div>
            </div>
        );
    }
}
