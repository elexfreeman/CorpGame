import React, {Component} from 'react';
import ProfileLeftBlock from "./ProfileLeftBlock";
import {updateUserInfo} from "../../models/user_model";
import MaskedInput from 'react-maskedinput';
import moment from "moment/moment";
import {mysqlDatePipe} from "../../base/pipes/date_pipe";


class ProfileEditComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.user.name
            , about: this.props.user.about
            , city: this.props.user.city
            , education: this.props.user.education
            , instagram: this.props.user.instagram
            , phone: this.props.user.phone
            , email: this.props.user.email
            , vk: this.props.user.vk
            , hobby: this.props.user.hobby
            , book: this.props.user.book
            , question: this.props.user.question
            , birthday: this.props.user.birthday
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.save = this.save.bind(this);
        this.onChangeB = this.onChangeB.bind(this);

    }


    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*проставляем занчения полей*/
        document.getElementById('name').value = this.props.user.name;
        document.getElementById('about').value = this.props.user.about;
        document.getElementById('city').value = this.props.user.city;
        document.getElementById('education').value = this.props.user.education;
        document.getElementById('instagram').value = this.props.user.instagram;
        document.getElementById('user_phone').value = this.props.user.phone;
        document.getElementById('email').value = this.props.user.email;
        document.getElementById('vk').value = this.props.user.vk;
        document.getElementById('hobby').value = this.props.user.hobby;
        document.getElementById('book').value = this.props.user.book;
        document.getElementById('question').value = this.props.user.question;
        document.getElementById('birthday').value = mysqlDatePipe(this.props.user.birthday);


    };


    onChangeInput(event) {
        event.preventDefault();
        if (event.target.id == 'name') {
            this.setState({name: event.target.value});
        }
        if (event.target.id == 'about') {
            this.setState({about: event.target.value});
        }
        if (event.target.id == 'user_phone') {
            this.setState({phone: event.target.value});
        }

        if (event.target.id == 'city') {
            this.setState({city: event.target.value});
        }

        if (event.target.id == 'education') {
            this.setState({education: event.target.value});
        }
        if (event.target.id == 'email') {
            this.setState({email: event.target.value});
        }

        if (event.target.id == 'instagram') {
            this.setState({instagram: event.target.value});
        }

        if (event.target.id == 'vk') {
            this.setState({vk: event.target.value});
        }

        if (event.target.id == 'hobby') {
            this.setState({hobby: event.target.value});
        }

        if (event.target.id == 'book') {
            this.setState({book: event.target.value});
        }

        if (event.target.id == 'question') {
            this.setState({question: event.target.value});
        }
    }

    /*изменееие даты рождения*/
    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    save() {

        let data = {
            // name: this.state.name
            about: this.state.about
            , city: this.state.city
            , education: this.state.education
            , instagram: this.state.instagram
            , phone: this.state.phone
            , email: this.state.email
            , vk: this.state.vk
            , hobby: this.state.hobby
            , book: this.state.book
            , question: this.state.question
            //тут вылезает warning
            , birthday: moment(this.state.birthday).format('YYYY-MM-DD')
        };
        updateUserInfo(data).then((resp) => {
             document.location.replace('/profile');
        })
    }


    render() {
        return (

            <section className="personal-page">
                <div className="container">
                    <h2 className="personal-page__title title">Моя страница</h2>
                    <div className="personal-page__wrapper">
                        <ProfileLeftBlock user={this.props.user} user_whom={this.props.user_whom}/>
                        <div className="personal-page__main">
                            <div className="personal-page__information form-information">
                                <div className="personal-page__selection-form">
                                    <div className="personal-page__form-group">
                                        <label className="personal-page__form-text second" htmlFor="name">Имя</label>
                                        <input disabled
                                               onChange={this.onChangeInput}
                                               className="personal-page__form-control form-name" id="name" type="text"
                                               name="name" placeholder="Имя"/>
                                    </div>
                                    <div className="personal-page__about-me">
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Статус:</h4>
                                            <p className="personal-page__cell status">Юнга</p>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Обо мне:</h4>
                                            <textarea
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control"
                                                id="about"
                                                rows="5"
                                                name="aboutMe"
                                            ></textarea>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Телефон:</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="user_phone" type="text"
                                                name="phone" placeholder="Телефон"/>
                                        </div>
                                    </div>
                                    <div className="personal-page__details">
                                        <div className="personal-page__string">


                                            <h4 className="personal-page__caption">День рождения:</h4>
                                            <MaskedInput mask="11.11.1111"
                                                         className="personal-page__form-control"
                                                         id="birthday" size="20"
                                                         name='birthday'
                                                         onChange={this.onChangeB}/>


                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Родной город:</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="city" type="text"
                                                name="city" placeholder="Родной город"/>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Образование:</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="education" type="text"
                                                name="education" placeholder="Образование"/>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Почта:</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="email" type="text"
                                                name="email" placeholder="e-mail" required=""/>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Инстаграмм: instagram.com/</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="instagram" type="text"
                                                name="instagram" placeholder="@instagram"/>
                                        </div>
                                        <div className="personal-page__string">
                                            <h4 className="personal-page__caption">Вк: vk.com/</h4>
                                            <input
                                                onChange={this.onChangeInput}
                                                className="personal-page__form-control" id="vk" type="text" name="vk"
                                                placeholder="vk.com/beleeza"/>
                                        </div>
                                    </div>

                                    <h4 className="personal-page__caption">Чем любишь заниматься в свободное время:</h4>
                                    <textarea
                                        onChange={this.onChangeInput}
                                        className="personal-page__form-control about-yourself"
                                        id="hobby"
                                        rows="5" name="freeTime"
                                    ></textarea>

                                    <h4 className="personal-page__caption">Любимая книга:</h4>
                                    <textarea
                                        onChange={this.onChangeInput}
                                        className="personal-page__form-control about-yourself"
                                        id="book"
                                        rows="5" name="favoriteBook"
                                    ></textarea>

                                    <h4 className="personal-page__caption">Что для тебя самоуправление?</h4>
                                    <textarea
                                        onChange={this.onChangeInput}
                                        className="personal-page__form-control about-yourself"
                                        id="question"
                                        rows="5" name="selfManagement"
                                    ></textarea>
                                    <button onClick={this.save} className="personal-page__btn admin-btn">Сохранить
                                        изменения
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

};


export default ProfileEditComponent;