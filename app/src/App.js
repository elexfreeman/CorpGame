import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPageComponent from "./pages/main/MainPageComponent";
import ProfileComponent from "./pages/profile/ProfileComponent";
import MembersComponent from "./pages/members/MembersComponent";
import TermsComponent from "./pages/terms_and_conditions/TermsComponent";
import NewsComponent from "./pages/news/NewsComponent";
import AfishaComponent from "./pages/afisha/AfishaComponent";
import UserProfileComponent from "./pages/profile/UserProfileComponent";
import LoginPageComponent from "./pages/login/LoginPageComponent";

import {getUserInfoByApiKey} from './models/user_model';
import RegisterPageComponent from "./pages/register/RegisterPageComponent";
import AdminComponent from "./pages/admin/AdminComponent";
import NewsAdminComponent from "./pages/admin/news/NewsAdminComponent";
import NewsSingleComponent from "./pages/news/NewsSingleComponent";
import AfishaSingleComponent from "./pages/afisha/AfishaSingleComponent";
import UserProfileEditComponent from "./pages/profile/UserProfileEditComponent";

import './base/arrow.scss';
import WishesAdminComponent from "./pages/admin/wishes/WishesAdminComponent";
import MembersAdminComponent from "./pages/admin/members/MembersAdminComponent";
import ValuesAdminComponent from "./pages/admin/values/ValuesAdminComponent";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: 'body__background--light'
            , user: null
            , isAuth: null
        };

        this.setBg = this.setBg.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
    };

    setBg(arg) {
        if (arg != this.state.bg) {
            this.setState({
                bg: arg
            })
        }
        //sdfsdf
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*загружаем инфу о юзере*/
        let apikey = localStorage.getItem('apikey');

        if (apikey == null) {
            this.setState({isAuth: false});
        } else {
            getUserInfoByApiKey().then((data) => {

                if (data.error) {
                    localStorage.removeItem('apikey');
                    this.setState({isAuth: false});
                } else {
                    this.setState({
                        isAuth: true
                        , user: data.user
                    });
                }

            }).catch((e) => {
                console.log(e);
            })
        }
    };

    setAuth(state) {

        if (state) {
            getUserInfoByApiKey().then((data) => {
                if (data.error) {
                    localStorage.removeItem('apikey');
                    this.setState({isAuth: false});
                } else {
                    this.setState({
                        isAuth: true
                        , user: data.user
                    });
                }

            }).catch((e) => {
                console.log(e);
            });
        } else {
            this.setState({isAuth: state});
        }


    }

    scrollTop(){
        document.getElementById('top1').scrollIntoView();
        document.getElementById('top1').scrollTop = 0;
    }


    render() {
        return (
            <div id='top1' className={this.state.bg}>

                {(this.state.isAuth == null) ? (
                    <section className="preloader">
                        <div className="box">
                            <h2 className="preloader__title title">
                                Скоро всё загрузится,<br/>а пока можно посмотреть<br/>на котика...</h2>
                            <div className="cat">
                                <div className="cat__body"></div>
                                <div className="cat__body"></div>
                                <div className="cat__tail"></div>
                                <div className="cat__head"></div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div>
                        {(this.state.isAuth == false) ? (
                            <div>

                                <Switch>

                                    <Route exact path={'/'}
                                           render={props => (
                                               <LoginPageComponent setBg={this.setBg}
                                                                   setAuth={this.setAuth} {...props}/>
                                           )}/>

                                    <Route exact path={'/register'}
                                           render={props => (
                                               <RegisterPageComponent setBg={this.setBg}
                                                                      setAuth={this.setAuth}  {...props}/>
                                           )}/>

                                </Switch>
                            </div>
                        ) : (
                            <Switch>

                                {
                                    //<AdminComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                    // <MainPageComponent login_user={this.state.user} setBg={this.setBg} {...props}/>

                                }
                                <Route exact path={'/'}
                                       render={props => (
                                           <MainPageComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/members'}
                                       render={props => (
                                           <MembersComponent login_user={this.state.user}
                                                             setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/profile'}
                                       render={props => (
                                           <UserProfileComponent login_user={this.state.user}
                                                                 setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/profile_edit'}
                                       render={props => (
                                           <UserProfileEditComponent login_user={this.state.user}
                                                                 setBg={this.setBg} {...props}/>
                                       )}/>


                                <Route exact path={'/profile/:id'}
                                       render={props => (
                                           <ProfileComponent login_user={this.state.user}
                                                             setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/terms_and_conditions'}
                                       render={props => (
                                           <TermsComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/news'}
                                       render={props => (
                                           <NewsComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>
                                <Route exact path={'/news/:news_id'}
                                       render={props => (
                                           <NewsSingleComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>


                                <Route exact path={'/afisha'}
                                       render={props => (
                                           <AfishaComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>
                                <Route exact path={'/afisha/:afisha_id'}
                                       render={props => (
                                           <AfishaSingleComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/admin_news'}
                                       render={props => (
                                           <NewsAdminComponent login_user={this.state.user} setBg={this.setBg} {...props}/>
                                       )}/>
                                <Route exact path={'/admin_wishes'}
                                       render={props => (
                                           <WishesAdminComponent login_user={this.state.user}
                                                               setBg={this.setBg} {...props}/>
                                       )}/>
                                <Route exact path={'/admin_members'}
                                       render={props => (
                                           <MembersAdminComponent login_user={this.state.user}
                                                                 setBg={this.setBg} {...props}/>
                                       )}/>

                                <Route exact path={'/admin_values'}
                                       render={props => (
                                           <ValuesAdminComponent login_user={this.state.user}
                                                                 setBg={this.setBg} {...props}/>
                                       )}/>

                            </Switch>
                        )}
                    </div>
                )}
                <div className="arr-top" id="arr-top" onClick={this.scrollTop} ></div>


            </div>
        )
    };
}


export default App;

