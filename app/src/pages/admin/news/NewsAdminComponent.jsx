import React, {Component} from 'react';
import HeaderComponent from "../../../base/header/HeaderComponent";
import NavAdminComponent from "../NavAdminComponent";
import NewsAddAdminComponent from "./NewsAddAdminComponent";
import {getListAdm} from "../../../models/news_model";
import {rest_server} from "../../../models/settings";
import {dateTimePipe} from "../../../base/pipes/date_pipe";
import NewsItem from "./NewsItem";

class NewsAdminComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            news: []
            , addFormShow: false
        };

        this.onAddNewsFormShow = this.onAddNewsFormShow.bind(this);
        this.onAddNewsFormHide = this.onAddNewsFormHide.bind(this);
        this.loadNews = this.loadNews.bind(this);
        this.sliceStr = this.sliceStr.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadNews();
    };

    sliceStr(str) {
        return str;
        /*if (str != null)
            return str.slice(0, 400) + '...';*/
    }

    loadNews() {

        getListAdm(0).then((resp) => {

            this.setState({
                news: resp.news
            });
        })
    }

    onAddNewsFormShow() {
        this.setState({
            addFormShow: true
        })
    }


    onAddNewsFormHide() {
        this.setState({
            addFormShow: false
        })
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

                                <section className="admin__news">
                                    <h2 className="admin__main-title title">Новости</h2>
                                    <div className="admin__search-form" action="#">
                                        <div className="admin__form-group search-form-group">
                                            <label
                                                className="admin__form-text second"
                                                htmlFor="valueSearchName">Поиск по заголовку</label>
                                            <input className="admin__form-control search-form-control"
                                                   id="valueSearchName" type="text" name="valueSearchName"
                                                   placeholder="Поиск по заголовку"/>
                                        </div>
                                        <button className="admin__btn admin-btn" type="submit">
                                            <div className="icon-search"></div>
                                        </button>
                                        <div className="admin__sort-container">
                                            <p className="admin__sort-about">Сортировать по:</p>
                                            <div className="admin__sort-wrapper">
                                                <a className="admin__sort-to-present" href="#">Дате
                                                    <div className="to-present"></div>
                                                </a>
                                                <a className="admin__sort-to-past hidden" href="#">
                                                    Дате <div className="to-past"></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {!this.state.addFormShow && (
                                        <a className="admin__add" onClick={this.onAddNewsFormShow}>
                                            <div className="admin__cross">
                                                <div className="icon-cross"></div>
                                            </div>
                                            <span className="admin__add-text">Добавить новость</span>
                                        </a>
                                    )}


                                    <ul className="admin__list-card">

                                        {this.state.addFormShow && (
                                            <NewsAddAdminComponent loadNews={this.loadNews} user={this.props.user}/>
                                        )}

                                        {this.state.news.map((n, key) =>
                                            <NewsItem key={key} item={n} />
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


export default NewsAdminComponent;