import React, {Component} from 'react';
import HeaderComponent from "../../../base/header/HeaderComponent";


import NavAdminComponent from "../NavAdminComponent";
import {getMembersListTotalScore} from "../../../models/users_model";
import MemberAdminComponent from "./MemberAdminComponent";
import {deleteUser} from "../../../models/user_model";

import './style.scss';


class MembersAdminComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            members: []
        };
        this.load = this.load.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
    };

    sliceStr(str) {
        return str;
        /*if (str != null)
            return str.slice(0, 400) + '...';*/
    }

    load() {
        getMembersListTotalScore().then((resp) => {
            if (!resp.error) {

                this.setState({
                    members: resp.members
                }, () => {
                    console.log(this.state.members);
                })
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    onDelete(id) {
        deleteUser(id).then((resp)=>{
            this.load();
        });

    }


    render() {
        return (
            <div>
                <h1 className="berg-game second"></h1>
                <HeaderComponent history={this.props.history} headclass={'header--dark'} user={this.props.login_user}/>
                <section className="admin">
                    <div className="container">
                        <h2 className="admin__title title">Настройки администратора</h2>
                        <div className="admin__container">
                            <NavAdminComponent/>
                            <main className="admin__main">
                                <section className="admin__members">
                                    <h2 className="admin__main-title title">Участники</h2>
                                    <ul className="member">

                                        {this.state.members.map((item, key) =>
                                            <MemberAdminComponent onDelete={this.onDelete} item={item} key={key}/>
                                        )}

                                    </ul>
                                </section>

                            </main>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}


export default MembersAdminComponent;