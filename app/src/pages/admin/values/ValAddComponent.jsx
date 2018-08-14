import React, {Component} from 'react';
import {getBase64} from "../../../models/images_model";
import {add, update} from "../../../models/company_values_model";
import AddImgValComponent from "./AddImgValComponent";
import {rest_server} from "../../../models/settings";

class ValAddComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
            , img_w: ''
            , img_b: ''
            , photo_b: ''
            , photo_w: ''
            , img_file_w: null
            , img_file_b: null
            , caption: ''
            , description: ''
        };
        this.onShowForm = this.onShowForm.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAddImages_w = this.onAddImages_w.bind(this);
        this.onAddImages_b = this.onAddImages_b.bind(this);
        this.onChangeB = this.onChangeB.bind(this);
    }

    /*событие изменения значения инпута*/
    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onShowForm() {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    onAddImages_w(data, file) {
        event.preventDefault();
        this.setState({
            photo_w: data
            , img_file_w: file
        })
    }

    onAddImages_b(data, file) {
        event.preventDefault();
        this.setState({
            photo_b: data
            , img_file_b: file
        })
    }


    onSave() {
        /*закрываем форму*/
        this.onShowForm();
        /*записываем данные*/
        add({
            caption: this.state.caption
            , description: this.state.description
            , img_file_w: this.state.img_file_w
            , img_file_b: this.state.img_file_b
        }).then(resp => {
            this.props.load();
        })
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    render() {
        return (
            <div>
                {this.state.showForm ? (
                    <li className="admin__item-card form-card">

                        <div className="admin__text-container">
                            <div className='admin__selection-form values-selection-form'>
                                <div className="admin__line-picture">
                                    <div className="admin__min-picture-wrapper">

                                        <AddImgValComponent white={true} setPhoto={this.onAddImages_w}
                                                            photo={this.state.photo_w}/>


                                        <AddImgValComponent white={false} setPhoto={this.onAddImages_b}
                                                            photo={this.state.photo_b}/>


                                    </div>
                                    <div className="admin__line new-form-line">
                                        <button onClick={this.onSave} className="admin__btn admin-btn values__btn">
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </div>

                                <div className="admin__line-text">
                                    <div className="admin__selection-form" action="#">
                                        <div className="admin__line">
                                            <div className="admin__form-group">
                                                <label className="admin__form-text second"
                                                       htmlFor="valueName">Ценность</label>
                                                <input className="admin__form-control"

                                                       type="text" name="caption"
                                                       onChange={this.onChangeB}
                                                       placeholder="Быть открытым"/>
                                            </div>
                                            <a className="admin__delete ico-delete" onClick={this.onShowForm}></a>
                                        </div>
                                        <div className="admin__form-group form-group-last">
                                            <label className="admin__form-text second"
                                                   htmlFor="valueText">Описание</label>
                                            <textarea

                                                className="admin__form-control"
                                                onChange={this.onChangeB}
                                                rows="5"
                                                name="description"
                                                placeholder=""></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ) : (
                    <a className="admin__add" onClick={this.onShowForm}>
                        <div className="admin__cross">
                            <div className="icon-cross"></div>
                        </div>
                        <span className="admin__add-text">Добавить ценность</span>
                    </a>
                )}
            </div>

        )
    }

}


export default ValAddComponent;