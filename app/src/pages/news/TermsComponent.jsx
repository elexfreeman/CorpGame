import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import RegisterPageComponent from "../register/RegisterPageComponent";
import Top5Component from "../../base/top5/Top5Component";
import ActivityComponent from "../../base/activity/ActivityComponent";
import NewsLeftComponent from "../../base/news/NewsLeftComponent";
import AfishaComponent from "../../base/afisha/AfishaComponent";
import SendWishComponent from "../../base/send-wish/SendWishComponent";

import {getUserInfoByApiKey} from '../../models/user_model';
import {getMembersListTotalScore} from '../../models/users_model';
import MembersListComponent from "../members/MembersListComponent";


class TermsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
            ,loader: true
            ,user: null
        };
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

                    }
                });
            }).catch((e) => {
                console.log(e);
            })
        }
    };


    render() {
        return (<div>
            {this.state.loader ? (
                <div></div>
            ) : (
                <div className="body__background--light">
                    <h1 className="berg-game second"></h1>
                    <HeaderComponent headclass={'header--dark'} user={this.state.user}/>
                    <section className="values">
                        <div className="container">
                            <h2 className="title">Ценности компании</h2>
                            <ul className="values__list">
                                <li className="values__item">
                                    <div className="icon-be-open"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Быть открытым</h3>
                                        <p className="values__about">
                                            говорить правду, высказывать недовольство<br/>
                                            быть готовым принять критику<br/>
                                            не бояться быть слабым, признавать ошибки  и обсуждать с командой<br/>
                                            решать конфликты обоюдно<br/>
                                            иметь силу извиниться<br/>
                                            говорить о своих идеях, мыслях и чувствах<br/>
                                            больше общаться и предлагать свою помощь
                                        </p>
                                    </div>
                                </li>
                                <li className="values__item">
                                    <div className="icon-be-customer-oriented"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Быть клиентно-ориентированным</h3>
                                        <p className="values__about">
                                            относись к клиенту так, как хочешь, чтобы относились к тебе<br/>
                                            выстраивать долгосрочные отношения, дружить с клиентом<br/>
                                            предугадывать желания и потребности клиента<br/>
                                            что бы ни произошло клиент всегда на первом месте<br/>
                                            слышать и слушать клиента<br/>
                                            делать как выгодно клиенту, а не как проще нам<br/>
                                            оставлять приятное послевкусие от общения, удивлять
                                        </p>
                                    </div>
                                </li>
                                <li className="values__item">
                                    <div className="icon-trust"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Доверять</h3>
                                        <p className="values__about">
                                            быть уверенным, что можно положиться на человека<br/>
                                            когда не жрут твою еду<br/>
                                            передать любую задачу и быть уверенным в ее исполнении<br/>
                                            делиться переживаниями и знать, что тебя поймут<br/>
                                            развивается в совместной работе
                                        </p>
                                    </div>
                                </li>
                                <li className="values__item">
                                    <div className="icon-be-friends"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Дружить</h3>
                                        <p className="values__about">
                                            проводить время вместе потому что нравится<br/>
                                            интересоваться жизнью и учитывать интересы друг друга<br/>
                                            заботиться в мелочах<br/>
                                            проявлять взаимоуважение<br/>
                                            приходить на помощь, знать, что ты не один в любой ситации<br/>
                                            грустного обнять)
                                        </p>
                                    </div>
                                </li>
                                <li className="values__item">
                                    <div className="icon-self-development"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Саморазвиваться</h3>
                                        <p className="values__about">
                                            читать полезную литературу<br/>
                                            использовать любые ресурсы для развития потенциала<br/>
                                            развивать свои сильные стороны и работать над слабыми<br/>
                                            не ограничиваться только своими прямыми обязанностями<br/>
                                            учиться новому, расширять кругозор<br/>
                                            быть ребенком, изучать мир<br/>
                                            следить за новостями мира и компании
                                        </p>
                                    </div>
                                </li>
                                <li className="values__item">
                                    <div className="icon-share"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">Делиться</h3>
                                        <p className="values__about">
                                            едой<br/>
                                            знаниями, опытом, свежими идеями<br/>
                                            радостями и переживаниями<br/>
                                            задачами и обязанностями<br/>
                                            добром и позитивом
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="conditions">
                        <div className="container">
                            <h2 className="title">Условия игры</h2>
                            <ul className="conditions__list">
                                <li className="conditions__item">
                                    <div className="conditions__award">
                                        <div className="ico-award-1"></div>
                                        <div className="conditions__award-text">уровень</div>
                                    </div>
                                    <div className="conditions__wrapper">
                                        <p className="conditions__points">150 баллов</p>
                                        <p className="conditions__reward">награда</p>
                                        <p className="conditions__cash">10 000 &#8381</p>
                                    </div>
                                </li>
                                <li className="conditions__item">
                                    <div className="conditions__award">
                                        <div className="ico-award-2"></div>
                                        <div className="conditions__award-text">уровень</div>
                                    </div>
                                    <div className="conditions__wrapper">
                                        <p className="conditions__points">300 баллов</p>
                                        <p className="conditions__reward">награда</p>
                                        <p className="conditions__cash">20 000 &#8381</p>
                                    </div>
                                </li>
                                <li className="conditions__item">
                                    <div className="conditions__award">
                                        <div className="ico-award-3"></div>
                                        <div className="conditions__award-text">уровень</div>
                                    </div>
                                    <div className="conditions__wrapper">
                                        <p className="conditions__points">500 баллов</p>
                                        <p className="conditions__reward">награда</p>
                                        <p className="conditions__cash">30 000 &#8381</p>
                                    </div>
                                </li>
                                <p className="conditions__about">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor non turpis
                                    at placerat.
                                    Nulla auctor ligula eget consectetur tincidunt. Etiam vel lorem congue, ultricies
                                    purus ut, tristique orci.
                                    Maecenas hendrerit, ipsum id placerat maximus, libero urna accumsan turpis, eu
                                    pellentesque lacus orci rutrum enim.
                                    Sed facilisis pharetra orci, et sollicitudin magna porta nec. Aliquam pharetra
                                    lectus augue, et aliquam nisi pretium id.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum et lorem
                                    quis tincidunt.
                                </p>
                            </ul>
                        </div>
                    </section>
                </div>
            )}

        </div>)
    }

};


export default TermsComponent;