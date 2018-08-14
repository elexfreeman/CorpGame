import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";

import {rest_server} from "../../models/settings";
import {datePipe, dateTimePipe} from "../../base/pipes/date_pipe";

import Link from "react-router-dom/es/Link";

import {get} from "../../models/afisha_model";
import {textPipe} from "../../base/pipes/text_pipe";


class AfishaSingleComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            afisha: null
        };


    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        get(this.props.match.params.afisha_id).then((resp)=>{
            this.setState({
                afisha:resp.afisha
            })
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
                                    <Link className="breadcrumb-item__sub-item" to={'/news'}>Афиша</Link>
                                </li>
                            </ol>
                        </nav>
                        {this.state.afisha != null && (
                            <div className="new-page__wrapper">
                                <h2 className="new-page__title title">{this.state.afisha.title}</h2>
                                <time className="new-page__time time"
                                      dateTime={dateTimePipe(this.state.afisha.i_date)}>{dateTimePipe(this.state.afisha.i_date)}</time>
                                <p className="new-page__about"
                                   dangerouslySetInnerHTML={{__html: textPipe(this.state.afisha.afisha)}}></p>
                            </div>
                        )}

                    </section>
                </div>
            </div>
        )
    }

};


export default AfishaSingleComponent;