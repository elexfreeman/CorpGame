import React, {Component} from 'react';

import {rest_server} from '../../models/settings';


import WallItemComment from "./WallItemComment";

class WallItemComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        // this.getUserRecords = this.getUserRecords.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    render() {
        return (

            <div className="activity__reaction">
                {this.props.wall_comments.map((item, key) =>
                    <WallItemComment key={key} item={item} parent={this.props.item}/>
                )}
            </div>
        )
    }

};


export default WallItemComments;