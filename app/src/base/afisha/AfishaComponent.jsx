import React, {Component} from 'react';
import AfishaModal from "./AfishaModal";
import {getList} from "../../models/afisha_model";
import {rest_server} from "../../models/settings";
import {datePipe} from "../pipes/date_pipe";
import Link from "react-router-dom/es/Link";


class AfishaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAfishaModal: false
            , afisha: []
        };

        this.sliceStr = this.sliceStr.bind(this);
        this.loadAfisha = this.loadAfisha.bind(this);


    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadAfisha();
    };

    sliceStr(str) {
        if (str != null)
            return str.slice(0, 100) + '...';
    }

    loadAfisha() {
        getList(0, 2).then((resp) => {
            this.setState({
                afisha: resp.afisha
            });
        });
    }


    render() {
        return (<section className="poster">
            <div className="title-wrapper">
                <h2 className="poster__title title">Афиша</h2>

            </div>
            <ul className="poster__wrapper">
                {this.state.afisha.map((a, key) =>
                    <li key={key} className="poster__item">
                        <Link className="poster__post" to={'/afisha/' + a.id}>
                            <div
                                style={{backgroundImage: 'url("' + rest_server + a.photoUrl + '")'}}
                                className="poster__picture"></div>
                            <div className="item-wrapper">
                                <p className="poster__name">{a.name}</p>
                                <time className="poster__time time"
                                      dateTime={datePipe(a.i_date)}>{datePipe(a.i_date)}</time>
                            </div>
                            <div className="item-wrapper">
                                <h3 className="poster__post-title">{a.title}</h3>
                                <p className="poster__about">{this.sliceStr(a.afisha)}</p>
                                <p className="poster__about-all"></p>
                            </div>
                        </Link>
                    </li>
                )}

            </ul>

            <AfishaModal reloadAfisha={this.loadAfisha} show={this.state.showAfishaModal}
                         onHide={this.onHideAfishaModal}/>

        </section>)
    }

};


export default AfishaComponent;