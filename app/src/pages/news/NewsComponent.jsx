import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import {getList} from "../../models/news_model";
import Link from "react-router-dom/es/Link";
import {dateTimePipe} from "../../base/pipes/date_pipe";
import {rest_server} from "../../models/settings";
import {textPipe} from "../../base/pipes/text_pipe";


class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            news: []
        };
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        getList(0, 100).then((resp) => {
            this.setState({
                news: resp.news
            })
        })

    };


    render() {
        return (
            <div>
                <h1 className="berg-game second"></h1>
                <HeaderComponent history={this.props.history} headclass={'header--dark'} user={this.props.login_user}/>
                <div className="news-story">
                    <div className="container">
                        <section className="news">
                            <div className="title-wrapper">
                                <h2 className="news__title title">Новости</h2>

                            </div>
                            <ul className="news__wrapper">
                                {this.state.news.map((item, key) =>
                                    <li className="news__item" key={key}>
                                        <Link to={'/news/'+item.id} className="news__new" >
                                            <div className="news__max-picture-wrapper">
                                                <img src={rest_server + item.news_img}

                                                    className="news__picture" />
                                            </div>
                                            <div className="news__text-wrapper">
                                                <h3 className="news__new-title">{item.title}</h3>
                                                <time className="news__time time" dateTime={dateTimePipe(item.i_date)}>{dateTimePipe(item.i_date)}</time>
                                                <p
                                                    dangerouslySetInnerHTML={{__html: textPipe(item.news)}}
                                                    className="news__about"></p>
                                            </div>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        )
    }

};


export default NewsComponent;