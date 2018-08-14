import React, {Component} from 'react';

import {register} from '../../models/register_model';
import Link from "react-router-dom/es/Link";

class RegisterPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
            , name_error: ''
            , email: ''
            , email_error: ''
            , pass: ''
            , pass_error: ''
            , pass2: ''
            , pass2_error: ''
            , error: false

        };
        this.onRegister = this.onRegister.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onRegister() {
        register({
            name: this.state.name
            , email: this.state.email
            , pass: this.state.pass
            , pass2: this.state.pass2
        }).then((resp) => {
            console.log(resp);
            /*ошибка регистарции*/
            if (resp.error) {
                this.setState({
                    error: true
                });
            } else {
                /*регистрация*/
                localStorage.setItem('apikey', resp.apikey);
                this.props.history.push("/profile");
            }
        }).catch((e) => {
            console.log(e);
        })
    }


    onChangeInput(event) {
        event.preventDefault();
        if (event.target.id == 'name') {
            this.setState({name: event.target.value});
        }
        if (event.target.id == 'email') {
            this.setState({email: event.target.value});
        }

        if (event.target.id == 'pass') {
            this.setState({pass: event.target.value});
        }
        if (event.target.id == 'pass2') {
            this.setState({pass2: event.target.value});
        }

    }

    render() {
        return (
            <div>
                <section className="register">
                    <div className="container">
                        <div className="register__wrapper"><span className="year">2018-год доверия и объединения</span>
                            <h2 className="register__title title">Регистрация</h2>
                            <div className="form">

                                <label className="second">Введите ваше имя</label>
                                <input className="form__control" type="text" id="name" onChange={this.onChangeInput}
                                       placeholder="Введите ваше имя"/>

                                <label className="second">Введите ваш e-mail</label>
                                <input className="form__control" type="text" id="email" onChange={this.onChangeInput}
                                       placeholder="Введите ваш e-mail"/>

                                <label className="second">Пароль</label>
                                <input className="form__control" type="password" id="pass" onChange={this.onChangeInput}
                                       placeholder="Придумайте пароль"/>

                                <label className="second">Повтор пароля</label>
                                <input className="form__control" type="password" id="pass2"
                                       onChange={this.onChangeInput}
                                       placeholder="Повторите пароль"/>

                                {this.state.error && (
                                    <div>Ошибка регистрации</div>
                                )}


                                <button
                                    onClick={this.onRegister}
                                    className="btn-form--register" type="button"
                                    value="Войти">Зарегистрироваться
                                </button>

                                <Link to={'/'} className="btn-form">Войти</Link>
                            </div>
                            <ul className="our-principles">
                                <li className="our-principles__item"><span className="icon-be-open"></span>
                                    <p className="our-principles__about open">Быть открытым</p>
                                </li>
                                <li className="our-principles__item"><span className="icon-trust"></span>
                                    <p className="our-principles__about trust">Доверять</p>
                                </li>
                                <li className="our-principles__item"><span className="icon-share"></span>
                                    <p className="our-principles__about share">Делиться</p>
                                </li>
                                <li className="our-principles__item"><span className="icon-be-customer-oriented"></span>
                                    <p className="our-principles__about customer-oriented">Быть
                                        клиентно-ориентированным</p>
                                </li>
                                <li className="our-principles__item"><span className="icon-be-friends"></span>
                                    <p className="our-principles__about friends">Дружить</p>
                                </li>
                                <li className="our-principles__item"><span className="icon-self-development"></span>
                                    <p className="our-principles__about self-development">Развиваться</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

        )
    }

};


export default RegisterPageComponent;