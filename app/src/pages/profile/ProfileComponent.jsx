import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import ProfilePersonComponent from "./ProfilePersonComponent";
import {getUserInfoById} from "../../models/user_model";


class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            user_whom: null
        };


    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

        /*загружаем инфу о юзере*/
        let apikey = localStorage.getItem('apikey');

        if (apikey == null) {
            this.setState({loader: false});
        } else {

            if (this.props.match.params.id == null) {
                /*РЕДИРЕКТИМ на профайл*/
                this.props.history.push("/profile");

            } else {
                /*загружаем профайл юзера залогиненного*/
                getUserInfoById(this.props.match.params.id).then((data) => {
                    if (data.error) {
                        localStorage.removeItem('apikey');
                        this.props.history.push("/")
                    } else {
                        this.setState({
                            auth: true
                            , user_whom: data.user
                            , user: data.login_user
                            , loader: false
                        });
                    }
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
    };


    render() {
        return (

            <div>
                <HeaderComponent history={this.props.history} user={this.props.login_user} headclass={'header--dark'}/>
                {this.state.user_whom != null && (
                    <ProfilePersonComponent
                        isLoginUser={false}
                        user={this.state.user}
                        user_whom={this.state.user_whom}/>
                )}
            </div>
        )
    }

};


export default ProfileComponent;