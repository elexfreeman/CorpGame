import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {rest_server} from '../../models/settings';
import Score from "./Score";
import UserStatusGenerator from "../../base/UserStatusGenerator";
import {getImgUrl} from "../../models/images_model";

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<li className="member__item">
            <Link className="member__card" to={'/profile/'+this.props.item.id}>
                <div className="member__picture" style={{backgroundImage: 'url("'+getImgUrl(this.props.item.photoUrl)+'")'}}></div>
                <div className="member__praises">
                    <Score score={this.props.item.score}/>
                </div>
                <h3 className="member__name">{this.props.item.name}</h3>
                {this.props.score && (
                    <p className="member__status">
                        <UserStatusGenerator score={this.props.item.score} />
                    </p>
                )}

            </Link>
        </li>)
    }

};


export default Member;