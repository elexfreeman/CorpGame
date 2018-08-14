import React, {Component} from 'react';
import {textPipe} from "../../../base/pipes/text_pipe";
import {pricePipe} from "../../../base/pipes/price_pipe";
import {deleteGoal, updateGoal} from "../../../models/rounds_model";
import {deleted} from "../../../models/company_values_model";


class GoalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
            , caption: this.props.item.caption
            , description: this.props.item.description
            , price: this.props.item.price
            , goal: this.props.item.goal
            , user_level_caption: this.props.item.user_level_caption
            , modalDeleted: false

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
            /*заполняем инпуты*/
            if (this.state.showForm) {
                document.getElementById('caption_' + this.props.item.id).value = this.props.item.caption;
                document.getElementById('description_' + this.props.item.id).value = this.props.item.description;
                document.getElementById('price_' + this.props.item.id).value = this.props.item.price;
                document.getElementById('goal_' + this.props.item.id).value = this.props.item.goal;
                document.getElementById('user_level_caption_' + this.props.item.id).value = this.props.item.user_level_caption;
            }
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
        updateGoal({
            id: this.props.item.id
            , caption: this.state.caption
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
        deleteGoal(this.props.item.id).then(resp => this.props.load())
    }

    /*при обновлении props*/
    componentDidUpdate(prevProps) {

    }


    render() {
        return (
            <div>
                {this.state.showForm ? (
                    <li className="admin__item-card form-card">
                        <div className="admin__text-container">
                            <div className="admin__line">
                                <div className="admin__form-group form-group-last">
                                    <label className="admin__form-text second"
                                           htmlFor={'caption_' + this.props.item.id}>
                                        Описание
                                    </label>
                                    <input className="admin__form-control"
                                           onChange={this.onChangeB}
                                           id={'caption_' + this.props.item.id}
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
                                           id={'user_level_caption_' + this.props.item.id}
                                           placeholder='Название уровня Юзера (Новичек, Бывалый и т.д.)...'
                                           onChange={this.onChangeB}
                                           name="user_level_caption"/>
                                </div>
                            </div>


                            <div className="admin__selection-form" action="#">
                                <div className="admin__form-group-container">


                                    <div className="admin__form-group number-form-group">
                                        <label className="admin__form-text" htmlFor={'goal_' + this.props.item.id}>
                                            Баллов для достижения:
                                        </label>
                                        <div className="admin__button-group">

                                            <input className="admin__form-control rubl-form-control"
                                                   onChange={this.onChangeB}
                                                   id={'goal_' + this.props.item.id}
                                                   type="number"
                                                   name="goal" placeholder="300"/>

                                        </div>
                                    </div>

                                    <div className="admin__form-group number-form-group rubl-form-group">
                                        <label className="admin__form-text form-rubl-text"
                                               htmlFor={'price_' + this.props.item.id}>
                                            Награда:
                                        </label>
                                        <input
                                            className="admin__form-control rubl-form-control"
                                            type="text"
                                            onChange={this.onChangeB}
                                            id={'price_' + this.props.item.id}
                                            name="price"
                                            placeholder="30 000 ₽"/>
                                    </div>
                                </div>
                                <div className="admin__form-group form-group-last">
                                    <label className="admin__form-text second" htmlFor="valueText">
                                        Описание
                                    </label>
                                    <textarea className="admin__form-control"
                                              onChange={this.onChangeB}
                                              id={'description_' + this.props.item.id}
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
                ) : (
                    <li className="admin__item-card">
                        <div className="admin__text-container">
                            <div className="admin__line">
                                <h3 className="admin__card-title">{this.props.item.user_level_caption} | {this.props.item.caption}</h3>

                                <a className="admin__replace-text" onClick={this.onShowForm}>
                                    <div className="ico-replace-text"></div>
                                </a>
                                <a className="admin__delete" onClick={() => this.setState({modalDeleted: true})}>
                                    <div className="ico-delete"></div>
                                </a>
                            </div>
                            <p className="admin__about-point">
                                <span className="admin__text-point">Баллов для достижения:</span>
                                <span className="admin__point">{pricePipe(this.props.item.goal)}</span>
                                <span className="admin__text-point">Награда:</span>
                                <span className="admin__point">{pricePipe(this.props.item.price)} ₽</span>
                            </p>
                            <p dangerouslySetInnerHTML={{__html: textPipe(this.props.item.description)}}
                               className="admin__about"></p>
                        </div>
                        <div className={this.state.modalDeleted ? ('modal-ok--open') : ('modal-ok')}>
                            <div className="btn-group">
                                <button onClick={this.onDelete} className="btn" type="button">Да</button>
                                <button onClick={() => this.setState({modalDeleted: false})} className="btn active"
                                        type="button">Отмена
                                </button>
                            </div>
                        </div>
                    </li>
                )}
            </div>
        )
    }

}


export default GoalComponent;