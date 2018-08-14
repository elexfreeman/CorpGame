import React, {Component} from 'react';
import {textPipe} from "../../../base/pipes/text_pipe";
import {rest_server} from "../../../models/settings";
import {deleted, update} from "../../../models/company_values_model";
import AddImgValComponent from "./AddImgValComponent";


class ValComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
            , img_w: rest_server + this.props.item.img_w
            , img_b: rest_server + this.props.item.img_b
            , photo_b: rest_server + this.props.item.img_b
            , photo_w: rest_server + this.props.item.img_w
            , img_file_w: null
            , img_file_b: null
            , caption: this.props.item.caption
            , description: this.props.item.description
            , modalDeleted: false
        };

        this.onShowForm = this.onShowForm.bind(this);
        this.onSave = this.onSave.bind(this);


        this.onChangeB = this.onChangeB.bind(this);
        this.onDelete = this.onDelete.bind(this);


        this.onAddImages_w = this.onAddImages_w.bind(this);
        this.onAddImages_b = this.onAddImages_b.bind(this);
    }

    onShowForm() {
        this.setState({
            showForm: !this.state.showForm
        }, () => {
            /*заполняем инпуты*/
            if (this.state.showForm) {
                document.getElementById('caption' + this.props.item.id).value = this.props.item.caption;
                document.getElementById('description' + this.props.item.id).value = this.props.item.description;
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
        /*записываем данные*/
        update({
            caption: this.state.caption
            , description: this.state.description
            , img_file_w: this.state.img_file_w
            , img_file_b: this.state.img_file_b
            , id: this.props.item.id
        }).then(resp => {

        })
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    onDelete() {
        this.setState({
            modalDeleted: false
        });
        deleted(this.props.item.id).then(resp => this.props.load())
    }

    /*при обновлении props*/
    componentDidUpdate(prevProps) {

        if (this.props.item.caption != prevProps.item.caption) {
            this.setState({
                caption: this.props.item.caption
                , img_w: rest_server + this.props.item.img_w
                , img_b: rest_server + this.props.item.img_b
                , photo_b: rest_server + this.props.item.img_b
                , photo_w: rest_server + this.props.item.img_w
                , description: this.props.item.description
            });
        }
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
                                                       id={'caption' + this.props.item.id}
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
                                                id={'description' + this.props.item.id}
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
                    <li className="admin__item-card">
                        <div className="admin__picture-container">
                            <div className="admin__add-picture-wrapper">
                                <div className="admin__picture-container">
                                    <div className="admin__picture-wrapper white-icon-picture-wrapper">
                                        <img
                                            className='admin__min-picture'
                                            src={this.state.photo_w} alt="picture"/>
                                    </div>
                                </div>
                            </div>

                            <div className="admin__add-picture-wrapper">
                                <div className="admin__picture-container">
                                    <div className="admin__picture-wrapper  brown-icon-picture-wrapp">
                                        <img
                                            className='admin__min-picture'
                                            src={this.state.photo_b} alt="picture"/>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="admin__text-container">
                            <div className="admin__line">
                                <h3 className="admin__card-title">{this.state.caption}</h3>
                                <div className="admin__ico-wrapper">
                                    <a onClick={this.onShowForm} className="admin__replace-text">
                                        <div className="ico-replace-text"></div>
                                    </a>
                                    <a className="admin__delete" onClick={() => this.setState({modalDeleted: true})}>
                                        <div className="ico-delete"></div>
                                    </a>
                                </div>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: textPipe(this.state.description)}}
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


export default ValComponent;