import React, {Component} from 'react';
import HeaderComponent from "../../../base/header/HeaderComponent";

import NavAdminComponent from "../NavAdminComponent";
import {getList} from "../../../models/company_values_model";
import ValComponent from "./ValComponent";
import ValAddComponent from "./ValAddComponent";

import './style.scss';
import {getCurentRound, getGoalsList} from "../../../models/rounds_model";
import GoalComponent from "./GoalComponent";
import RoundComponent from "./RoundComponent";
import GoalAddComponent from "./GoalAddComponent";

class ValuesAdminComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            c_values: []
            , goals: []
            , round: null
        };
        this.load = this.load.bind(this);
        this.loadVals = this.loadVals.bind(this);
        this.loadGoals = this.loadGoals.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
    };




    load() {
        this.loadVals();
        this.loadGoals();

        getCurentRound().then(resp => {
            this.setState({
                round: resp.round
            })
        })
    }

    loadVals(){
        getList().then((resp) => {
            this.setState({
                c_values: resp.values
            })
        });
    }

    loadGoals(){
        getGoalsList().then(resp => {
            this.setState({
                goals: resp.goals
            })
        });
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
                                <section className="admin__conditions-values">
                                    <div className="admin__values">
                                        <h2 className="admin__main-title title">Ценности</h2>
                                        <ValAddComponent load={this.loadVals}/>
                                        <ul className="admin__list-card">
                                            {this.state.c_values.map((item, key) =>
                                                <ValComponent load={this.loadVals} key={key} item={item}/>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="admin__conditions">

                                        <h2 className="admin__main-title title">Условия</h2>
                                        <RoundComponent/>

                                        <GoalAddComponent load={this.loadGoals}/>

                                        <ul className="admin__list-card">
                                            {this.state.goals.map((item, key) =>
                                                <GoalComponent load={this.loadGoals} key={key} item={item}/>
                                            )}
                                        </ul>

                                    </div>
                                </section>

                            </main>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}


export default ValuesAdminComponent;