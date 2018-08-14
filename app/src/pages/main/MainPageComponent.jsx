import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";

import Top5Component from "../../base/top5/Top5Component";
import ActivityComponent from "../../base/activity/ActivityComponent";
import NewsLeftComponent from "../../base/news/NewsLeftComponent";
import AfishaComponent from "../../base/afisha/AfishaComponent";
import SendWishComponent from "../../base/send-wish/SendWishComponent";


class MainPageComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background');
        this.state = {
            auth: false
            , loader: true
            , user: {}
        };
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    render() {
        return (
            <div>
                <HeaderComponent history={this.props.history} user={this.props.login_user}/>
                <Top5Component/>
                <section className="main-container">
                    <div className="container">
                        <ActivityComponent user={this.props.login_user}/>
                        <aside className="additionally">
                            <NewsLeftComponent user={this.props.login_user}/>
                            <AfishaComponent user={this.props.login_user}/>
                            <SendWishComponent user={this.props.login_user}/>
                        </aside>
                    </div>
                </section>
            </div>
        )
    }

};


export default MainPageComponent;