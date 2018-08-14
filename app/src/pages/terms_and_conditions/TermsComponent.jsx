import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";
import {getList} from "../../models/company_values_model";
import {getCurentRound, getGoalsList} from "../../models/rounds_model";
import {textPipe} from "../../base/pipes/text_pipe";
import {rest_server} from "../../models/settings";
import {pricePipe} from "../../base/pipes/price_pipe";


class TermsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
            , loader: true
            , user: null
            , c_values: []
            , goals: []
            , round: null
        };
        this.load = this.load.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
    };


    load() {
        getList().then((resp) => {
            this.setState({
                c_values: resp.values
            })
        });

        getCurentRound().then(resp => {
            this.setState({
                round: resp.round
            })
        });

        getGoalsList().then(resp => {
            this.setState({
                goals: resp.goals
            })
        });
    }


    render() {
        return (
            <div className="body__background--light">
                <h1 className="berg-game second"></h1>
                <HeaderComponent headclass={'header--dark'} user={this.props.login_user}/>
                <section className="values">
                    <div className="container">
                        <h2 className="title">Ценности компании</h2>
                        <ul className="values__list">
                            {this.state.c_values.map((item, key) =>
                                <li key={key} className="values__item">
                                    <div
                                        style={{backgroundImage: 'url("' + rest_server + item.img_b + '")'}}
                                        className="ico-be-open"></div>
                                    <div className="values__wrapper">
                                        <h3 className="values__title">{item.item}</h3>
                                        <p
                                            dangerouslySetInnerHTML={{__html: textPipe(item.description)}}
                                            className="values__about"></p>
                                    </div>
                                </li>
                            )}

                        </ul>
                    </div>
                </section>
                <section className="conditions">
                    <div className="container">
                        <h2 className="title">Условия игры</h2>
                        <ul className="conditions__list">
                            {this.state.goals.map((item, key) =>
                                <li key={key} className="conditions__item">
                                    <div className="conditions__award">
                                        <div className="ico-award">
                                            <div className="conditions__award-number">{key+1}</div>
                                        </div>
                                        <div className="conditions__award-text">уровень</div>
                                    </div>
                                    <div className="conditions__wrapper">
                                        <p className="conditions__points">{item.goal} баллов</p>
                                        <p className="conditions__reward">награда {pricePipe(item.price)}</p>
                                        <p className="conditions__cash">{item.user_level_caption}</p>
                                    </div>
                                </li>
                            )}


                            {this.state.round && (
                                <p
                                    dangerouslySetInnerHTML={{__html: textPipe(this.state.round.description)}}
                                    className="conditions__about"></p>
                            )}

                        </ul>
                    </div>
                </section>
            </div>
        )
    }

};


export default TermsComponent;