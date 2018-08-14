import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";

import {getList} from "../../models/afisha_model";
import {rest_server} from "../../models/settings";
import {datePipe} from "../../base/pipes/date_pipe";
import AfishaModal from "../../base/afisha/AfishaModal";
import Link from "react-router-dom/es/Link";
import {textPipe} from "../../base/pipes/text_pipe";

class AfishaComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            afisha: []
        };
        this.loadAfisha = this.loadAfisha.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadAfisha();
    };

    sliceStr(str) {

        if (str != null)
            return str.slice(0, 300) + '...';
    }

    loadAfisha(){

        getList(0, 10).then((resp) => {
            console.log(resp);
            this.setState({
                afisha: resp.afisha
            });
        })
    }


    render() {
        return (
            <div>
                <h1 className="berg-game second"></h1>
                <HeaderComponent history={this.props.history} headclass={'header--dark'} user={this.props.login_user}/>
                <div className="container">
                    <section className="poster-page">
                        <div className="title-wrapper">
                            <h2 className="poster-page__title title">Афиша</h2>

                            <AfishaModal reloadAfisha={this.loadAfisha} show={this.state.showAfishaModal}
                                         onHide={this.onHideAfishaModal}/>
                        </div>
                        <ul className="poster-page__wrapper">
                            {this.state.afisha.map((a, key)=>
                                <li key={key} className="poster__item">
                                    <Link className="poster__post" to={'/afisha/'+a.id}>
                                        <div
                                            style={{backgroundImage: 'url("' + rest_server + a.photoUrl + '")'}}
                                            className="poster__picture"></div>
                                        <div className="item-wrapper">
                                            <p className="poster__name">{a.name}</p>
                                            <time className="poster__time time" dateTime={datePipe(a.i_date)}>{datePipe(a.i_date)}</time>
                                        </div>
                                        <div className="item-wrapper">
                                            <h3 className="poster__post-title">{a.title}</h3>
                                            <p
                                                dangerouslySetInnerHTML={{__html: textPipe(a.afisha)}}
                                                className="poster__about"></p>
                                        </div>
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </section>
                </div>
            </div>
        )
    }

};


export default AfishaComponent;