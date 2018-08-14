import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import MembersListComponent from "./MembersListComponent";




class MembersComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {};
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    render() {
        return (<div>
            <h1 className="berg-game second"></h1>
            <HeaderComponent headclass={'header--dark'} user={this.props.login_user}/>
            <MembersListComponent/>
        </div>)
    }

};


export default MembersComponent;