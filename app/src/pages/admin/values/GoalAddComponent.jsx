import React, {Component} from 'react';
import {textPipe} from "../../../base/pipes/text_pipe";
import {pricePipe} from "../../../base/pipes/price_pipe";
import {addGoal, updateGoal} from "../../../models/rounds_model";


class GoalAddComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
            , caption: ''
            , description: ''
            , user_level_caption: ''
            , price: 0
            , goal: 0

        };

        this.onShowForm = this.onShowForm.bind(this);
        this.onSave = this.onSave.bind(this);

        this.onChangeB = this.onChangeB.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onShowForm() {
        this.setState({
            showForm: !this.state.showForm
        }, () => {

        })
    }

    /*событие изменения значения инпута*/
    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    /*событие сохранения*/
    onSave() {
        /*закрываем форму*/
        this.onShowForm();
        addGoal({
            caption: this.state.caption
            , description: this.state.description
            , price: this.state.price
            , goal: this.state.goal
            , user_level_caption: this.state.user_level_caption
        }).then(() => {
            this.props.load();
        })

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    onDelete() {

    }

    /*при обновлении props*/
    componentDidUpdate(prevProps) {

    }


    render() {
        return (
            <div>
                {this.state.showForm ? (
                    <ul className="admin__list-card">
                        <li className="admin__item-card form-card">
                            <div className="admin__text-container">


                                <div className="admin__line">
                                    <div className="admin__form-group form-group-last">
                                        <label className="admin__form-text second">
                                            Описание
                                        </label>
                                        <input className="admin__form-control"
                                               placeholder='Название...'
                                               onChange={this.onChangeB}
                                               name="caption"/>
                                    </div>
                                    <a className="admin__delete ico-delete" onClick={this.onShowForm}></a>
                                </div>

                                <div className="admin__line">
                                    <div className="admin__form-group form-group-last">
                                        <label className="admin__form-text second">
                                            Название уровня Юзера (Новичек, Бывалый и т.д.)
                                        </label>
                                        <input className="admin__form-control"
                                               placeholder='Название уровня Юзера (Новичек, Бывалый и т.д.)...'
                                               onChange={this.onChangeB}
                                               name="user_level_caption"/>
                                    </div>
                                </div>


                                <div className="admin__selection-form" action="#">
                                    <div className="admin__form-group-container">


                                        <div className="admin__form-group number-form-group">
                                            <label className="admin__form-text" htmlFor={'goal_'}>
                                                Баллов для достижения:
                                            </label>
                                            <div className="admin__button-group">
                                                <button className="admin__btn minus-btn" type="button">-</button>
                                                <input className="admin__form-number-control"
                                                       onChange={this.onChangeB}
                                                       id={'goal_'}
                                                       type="number"
                                                       name="goal" placeholder="300"/>
                                                <button className="admin__btn plus-btn"
                                                        type="button">+
                                                </button>
                                            </div>
                                        </div>

                                        <div className="admin__form-group number-form-group rubl-form-group">
                                            <label className="admin__form-text form-rubl-text">
                                                Награда:
                                            </label>
                                            <input
                                                className="admin__form-control rubl-form-control"
                                                type="text"
                                                onChange={this.onChangeB}
                                                name="price"
                                                placeholder="30 000 ₽"/>
                                        </div>
                                    </div>
                                    <div className="admin__form-group form-group-last">
                                        <label className="admin__form-text second" htmlFor="valueText">
                                            Описание
                                        </label>
                                        <textarea className="admin__form-control"
                                                  placeholder='Описание...'
                                                  onChange={this.onChangeB}
                                                  rows="5"
                                                  name="description"
                                        ></textarea>
                                    </div>
                                    <button className="admin__btn admin-btn"
                                            onClick={this.onSave}
                                            type="button">
                                        Сохранить изменения
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                ) : (
                    <a className="admin__add" onClick={this.onShowForm}>
                        <div className="admin__cross">
                            <div className="icon-cross"></div>
                        </div>
                        <span className="admin__add-text">Добавить уровень</span>
                    </a>
                )}
            </div>
        )
    }

}


export default GoalAddComponent;