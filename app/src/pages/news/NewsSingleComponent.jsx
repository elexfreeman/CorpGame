import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import Link from "react-router-dom/es/Link";
import {getNewsSingle} from "../../models/news_model";
import {dateTimePipe} from "../../base/pipes/date_pipe";
import {textPipe} from "../../base/pipes/text_pipe";
import {rest_server} from "../../models/settings";

class NewsSingleComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            news: null
        };
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

        getNewsSingle(this.props.match.params.news_id).then((resp) => {
            if (!resp.error) {
                this.setState({
                    news: resp.news
                })
            }
        })

    };


    render() {
        return (

            <div className="body__background--light">
                <h1 className="berg-game second"></h1>
                <HeaderComponent headclass={'header--dark'} user={this.props.login_user}/>
                <div className="container">
                    <section className="new-page">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    <Link className="breadcrumb-item__sub-item" to={'/'}>Главная</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link className="breadcrumb-item__sub-item" to={'/news'}>Новости</Link>
                                </li>
                            </ol>
                        </nav>
                        {this.state.news != null && (
                            <div className="new-page__wrapper">
                                <h2 className="new-page__title title">{this.state.news.title}</h2>
                                <time className="new-page__time time"
                                      dateTime={dateTimePipe(this.state.news.i_date)}>{dateTimePipe(this.state.news.i_date)}</time>
                                {(this.state.news.images[0]!=null)&&(
                                    <img className="new-page__picture" src={rest_server + this.state.news.images[0].img} alt="picture" />
                                )}

                                <p dangerouslySetInnerHTML={{__html: textPipe(this.state.news.news)}}
                                    className="new-page__about"></p>
                            </div>
                        )}

                    </section>
                </div>
            </div>

        )
    }

}


export default NewsSingleComponent;