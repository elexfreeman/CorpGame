import React, {Component} from 'react';

import {getImgUrl} from "../../../models/images_model";
import Link from "react-router-dom/es/Link";


class MemberAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalDeleted: false
        }
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    render() {
        return (
            <li className="member__item">
                <div className="member__card">
                    <div className="member__picture"
                         style={{backgroundImage: 'url("' + getImgUrl(this.props.item.photoUrl) + '")'}}>

                        <a className="admin__picture-close" onClick={() => this.setState({modalDeleted: true})}>
                            <div className="picture-close"></div>
                        </a>

                    </div>

                    <Link className="member__card" to={'/profile/' + this.props.item.id}>
                        <h3 className="member__name">{this.props.item.name}</h3>
                    </Link>
                    {this.props.score && (
                        <p className="member__status">
                            <UserStatusGenerator score={this.props.item.score}/>
                        </p>
                    )}
                </div>
                <div className={this.state.modalDeleted ? ('modal-ok--open') : ('modal-ok')}>
                    <div className="btn-group">

                        <button onClick={(e) => {
                            this.setState({modalDeleted: false});
                            this.props.onDelete(this.props.item.id)
                        }
                        }
                                className="btn" type="button">Да</button>

                        <button onClick={() => this.setState({modalDeleted: false})}
                                className="btn active"
                                type="button">Отмена
                        </button>

                    </div>
                </div>
            </li>
        )
    }

};


export default MemberAdminComponent;