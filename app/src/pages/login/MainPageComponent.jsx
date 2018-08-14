import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import RegisterPageComponent from "../register/RegisterPageComponent";
import Top5Component from "../../base/top5/Top5Component";
import ActivityComponent from "../../base/activity/ActivityComponent";
import NewsLeftComponent from "../../base/news/NewsLeftComponent";
import AfishaComponent from "../../base/afisha/AfishaComponent";
import SendWishComponent from "../../base/send-wish/SendWishComponent";

import {getUserInfoByApiKey} from '../../models/user_model';

class MainPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
            ,loader: true
            ,user: {}
        };

        //this.loadMembersTotalScore = this.loadMembersTotalScore.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*загружаем инфу о юзере*/
        let apikey = localStorage.getItem('apikey');

        if (apikey == null) {
            this.setState({loader: false});
        } else {
            getUserInfoByApiKey().then((data) => {
                this.setState({loader: false}, () => {

                    if (data.error) {
                        localStorage.removeItem('apikey');
                        this.setState({auth: false});
                    } else {
                        this.setState({
                            auth: true
                            ,user: data.user
                        });
                        this.loadMembersTop5();
                    }
                });
            }).catch((e) => {
                console.log(e);
            })
        }
    };

    loadMembersTop5(){
      /*  getMembersListTotalScore().then((resp)=>{
            console.log(resp);
        }).cach((e)=>{
            console.log(e);
        })*/
    }


    render() {
        return (<div>
            {this.state.loader ? (
                <div className={'body__background'}></div>
            ) : (
                <div>
                    {this.state.auth ? (
                        <div className={'body__background'}>
                            <HeaderComponent user={this.state.user}/>
                            <Top5Component/>
                            <section className="main-container">
                                <div className="container">
                                    <ActivityComponent/>
                                    <aside className="additionally">
                                        <NewsLeftComponent/>
                                        <AfishaComponent/>
                                        <SendWishComponent/>
                                    </aside>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <RegisterPageComponent history={this.props.history}/>
                    )}
                </div>
            )}

        </div>)
    }

};


export default MainPageComponent;