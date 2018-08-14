import React, {Component} from 'react';
import {textPipe} from "../../../base/pipes/text_pipe";

import {getCurentRound, updateRound} from "../../../models/rounds_model";


class RoundComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
            , round: null


        };

        this.onShowForm = this.onShowForm.bind(this);
        this.onSave = this.onSave.bind(this);


        this.onChangeB = this.onChangeB.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.load = this.load.bind(this);
    }

    onShowForm() {
        this.setState({
            showForm: !this.state.showForm
        }, () => {
            /*заполняем инпуты*/
            if (this.state.showForm) {
                document.getElementById('round_description').value = this.state.round.description;
            }
        })
    }

    load() {
        getCurentRound().then(resp => {
            this.setState({
                round: resp.round
            })
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
        updateRound(this.state.description).then(() => {
            this.load();
        })

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
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
                    <div className="admin__item-card item-card-first">
                        <div className="admin__text-container">
                            <div className="admin__line">
                                <a className="admin__delete ico-delete" onClick={this.onShowForm}></a>
                            </div>
                            <div className="admin__selection-form" action="#">

                                <div className="admin__form-group form-group-last">
                                    <label className="admin__form-text second"
                                           htmlFor="valueText">Описание</label>
                                    <textarea className="admin__form-control"
                                              onChange={this.onChangeB}
                                              id="round_description"
                                              rows="15" name="description"
                                    ></textarea>
                                </div>
                                <button className="admin__btn admin-btn"
                                        onClick={this.onSave}
                                        type="button">Сохранить изменения
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="admin__item-card item-card-first">
                        {this.state.round && (
                            <p
                                dangerouslySetInnerHTML={{__html: textPipe(this.state.round.description)}}
                                className="admin__about"></p>
                        )}

                        <a className="admin__replace-text" onClick={this.onShowForm}>
                            <div className="ico-replace-text"></div>
                        </a>
                    </div>
                )}
            </div>
        )
    }

}


export default RoundComponent;