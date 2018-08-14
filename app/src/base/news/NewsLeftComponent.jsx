import React, {Component} from 'react';
import {getList} from "../../models/news_model";
import {rest_server} from "../../models/settings";
import {datePipe} from "../pipes/date_pipe";
import Link from "react-router-dom/es/Link";


class NewsLeftComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
        this.loadNews = this.loadNews.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadNews();
    };

    loadNews() {
        console.log('componentDidMount');
        getList(0, 5).then((resp) => {
            this.setState({
                news: resp.news
            });
        })
    }


    render() {
        return (<section className="news">
            <div className="title-wrapper">
                <h2 className="news__title title">Новости</h2>
                <a className="btn-to-share" href="#">Добавить<br/>новость
                    <div className="icon-cross"></div>
                </a>
                <div className="modal">
                    <div className="popup-add">
                        <div className="popup-add__component">
                            <button className="cancel">
                                <div className="ico-cancel"></div>
                            </button>
                            <div className="popup-add__wrapper">
                                <h3 className="popup-add__title">Добавить новость</h3>
                                <textarea className="popup-add__coment" rows="3" name="awesome"></textarea>
                                <button className="btn-like">Отправить</button>
                            </div>
                        </div>
                        <div className="popup-add__backdrop"></div>
                    </div>
                    <div className="popup-shipped">
                        <div className="popup-shipped__component">
                            <div className="icon-airplane"></div>
                            <p className="popup-shipped__about">Новость добавлена</p>
                        </div>
                        <div className="popup-shipped__backdrop"></div>
                    </div>
                </div>
            </div>
            <ul className="news__wrapper">
                {this.state.news.map((n, key) =>
                    <li key={key} className="news__item">
                        <Link className="news__new" to={'/news/' + n.id}>
                            <div className={'news__max-picture-wrapper'}>
                                <img className="news__picture" src={rest_server + n.news_img} alt="picture"/>
                            </div>
                            <div className="news__text-wrapper">
                                <h3 className="news__new-title">{n.title}</h3>
                                <time className="news__time time"
                                      dateTime={datePipe(n.i_date)}>{datePipe(n.i_date)}</time>
                            </div>
                        </Link>
                    </li>
                )}

            </ul>
        </section>)
    }

};


export default NewsLeftComponent;