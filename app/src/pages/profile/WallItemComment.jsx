import React, {Component} from 'react';

import {rest_server} from '../../models/settings';
import {datePipe} from "../../base/pipes/date_pipe";
import Link from "react-router-dom/es/Link";
import {textPipe} from "../../base/pipes/text_pipe";


class WallItemComment extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    render() {
        return (

            <div className="reaction__post">
                <div
                    style={{backgroundImage: 'url("' + rest_server + this.props.item.author_photoUrl + '")'}}
                    className="reaction__picture"></div>
                <div className="reaction__wrapper">
                    <div className="activity__adress">
                        <Link className="activity__somebody-name" to={'/profile/'+this.props.item.author}>{this.props.item.author_name}</Link>

                        <p
                            dangerouslySetInnerHTML={{__html: textPipe(this.props.item.content)}}
                            className="activity__text"></p>
                        <div className="activity__adress-wrapper">
                            <div className="activity__like">{this.props.item.lr_caption}</div>
                            <time className="activity__time"
                                  dateTime={datePipe(this.props.item.i_date)}>{datePipe(this.props.item.i_date)}</time>
                        </div>
                    </div>
                    <div className="reaction__images">
                        {this.props.item.images.map((item_img, key2) =>
                            <img key={key2} className="reaction__img" src={rest_server + item_img.img} alt="picture" />
                        )}
                    </div>
                </div>
            </div>

        )
    }

};


export default WallItemComment;