import React, {Component} from 'react';

import {getUserInfoByApiKey, login} from '../../models/user_model';
import Link from "react-router-dom/es/Link";

class LoginPageComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--dark');
        this.state = {
            auth: false
            , loader: true
            ,login: ''
            ,password: ''
        };

        this.login = this.login.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    onChangeInput(event) {
        event.preventDefault();
        if (event.target.id == 'login') {
            this.setState({login: event.target.value});
        }
        if (event.target.id == 'password') {
            this.setState({password: event.target.value});
        }
    }

    login(){
        login(this.state.login, this.state.password).then((resp)=>{
           if(resp.error){

           } else {
               localStorage.setItem('apikey',resp.user.apikey);
               this.props.setAuth(true);
           }
        });

    }



    render() {
        return (<div>
            <h1 className="berg-game second"></h1>
            <section className="login">
                <div className="container">
                    <div className="login__wrapper">
                        <span className="year">2018-год доверия и объединения</span>
                        <h2 className="login__title title">Вход</h2>
                        <div className="form" >

                            <label className="second" name="email">Введите ваш e-mail</label>
                            <input onChange={this.onChangeInput} className="form__control" id="login" name="email"
                                   placeholder="Введите ваш e-mail" required/>

                            <label className="second" name="password">Пароль</label>
                            <input onChange={this.onChangeInput} className="form__control" id="password" type="password" name="psw"
                                   placeholder="Пароль" required/>

                            <button onClick={this.login} className="btn-form"  value="Войти">Войти</button>
                        </div>
                        <Link className="login__or-register" to='/register'>или&nbsp;<strong>зарегистрироваться</strong></Link>
                        <ul className="our-principles">
                            <li className="our-principles__item">
                                <span className="icon-be-open"></span>
                                <p className="our-principles__about open">Быть открытым</p>
                            </li>
                            <li className="our-principles__item">
                                <span className="icon-trust"></span>
                                <p className="our-principles__about trust">Доверять</p>
                            </li>
                            <li className="our-principles__item">
                                <span className="icon-share"></span>
                                <p className="our-principles__about share">Делиться</p>
                            </li>
                            <li className="our-principles__item">
                                <span className="icon-be-customer-oriented"></span>
                                <p className="our-principles__about customer-oriented">Быть клиентно-ориентированным</p>
                            </li>
                            <li className="our-principles__item">
                                <span className="icon-be-friends"></span>
                                <p className="our-principles__about friends">Дружить</p>
                            </li>
                            <li className="our-principles__item">
                                <span className="icon-self-development"></span>
                                <p className="our-principles__about self-development">Развиваться</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>)
    }

};


export default LoginPageComponent;