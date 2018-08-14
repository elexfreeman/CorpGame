import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import ProfileEditComponent from "./ProfileEditComponent";


class UserProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');

        this.state = {};
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    render() {
        return (

            <div>
                <HeaderComponent history={this.props.history} user={this.props.login_user} headclass={'header--dark'}/>
                <ProfileEditComponent
                    isLoginUser={false}
                    user={this.props.login_user}
                    user_whom={this.props.login_user}/>
            </div>
        )
    }

};


export default UserProfileComponent;