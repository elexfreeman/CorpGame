import React, {Component} from 'react';
import {rest_server} from '../../models/settings';
import ProfileRecords from "./ProfileRecords";
import ProfileSendFormComponent from "./ProfileSendFormComponent";
import {getUserWall, getUserOnlyWall} from "../../models/wall_model";
import ProfileLeftBlock from "./ProfileLeftBlock";
import Link from "react-router-dom/es/Link";
import UserStatusGenerator from "../../base/UserStatusGenerator";
import {mysqlDatePipe} from "../../base/pipes/date_pipe";

class ProfilePersonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: rest_server
            , showMore: false
            , wall: []
            , all_records: true
            , offset: 0

        };
        this.onShowMore = this.onShowMore.bind(this);
        this.onHideMore = this.onHideMore.bind(this);
        this.getUserRecords = this.getUserRecords.bind(this);
        this.addWallItem = this.addWallItem.bind(this);
        this.onChangeAllRecords = this.onChangeAllRecords.bind(this);
        this.getUserOnlyRecords = this.getUserOnlyRecords.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }

    onShowMore() {
        this.setState({showMore: true})
    }

    onHideMore() {
        this.setState({showMore: false})
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.getUserRecords(this.state.offset);
    };

    /*событе переключения стены на мои записи или все*/
    onChangeAllRecords() {

        if (this.state.all_records) {
            this.setState({
                all_records: false
            }, this.getUserRecords(this.state.offset))
        } else {
            this.setState({
                all_records: true
            }, this.getUserOnlyRecords(this.state.offset))
        }
    }

    onLoadMore() {
        this.setState({offset: this.state.offset + 10}, this.onChangeAllRecords)

    }

    /*выдает инфу по залогиненному юзеру*/

    /*только свои записи*/
    getUserOnlyRecords(offset) {
        getUserOnlyWall(this.props.user_whom.id, offset).then((data) => {
            this.setState({loader: false}, () => {
                if (data.error) {
                    //  this.props.history.push("/")
                } else {
                    let tmp = this.state.wall;
                    this.setState({
                        auth: true
                        , wall: tmp.concat(data.wall)
                    });
                }
            });
        }).catch((e) => {
            console.log(e);
        })
    }


    /*выдает инфу по залогиненному юзеру*/

    /*все записи*/
    getUserRecords(offset) {
        getUserWall(this.props.user_whom.id, offset).then((data) => {
            this.setState({loader: false}, () => {
                if (data.error) {
                    //  this.props.history.push("/")
                } else {
                    let tmp = this.state.wall;
                    this.setState({
                        auth: true
                        , wall: tmp.concat(data.wall)
                    });
                }
            });
        }).catch((e) => {
            console.log(e);
        })
    }

    /*добавляет элемент в стену*/
    addWallItem(item) {
        this.setState({
            wall: []
            , offset: 0
        }, () => {
            this.getUserRecords(this.state.offset);
        });
        /* let tmp = this.state.wall;
         tmp.unshift(item);
         this.setState({
             wall: tmp
         })*/
    }


    render() {
        return (<section className="personal-page">
            <div className="container">
                {(this.props.user.id == this.props.user_whom.id) ? (
                    <h2 className="personal-page__title title">Моя страница</h2>
                ) : (<div style={{width: '100%', height: '2rem'}}></div>)}

                <div className="personal-page__wrapper">
                    <ProfileLeftBlock user={this.props.user} user_whom={this.props.user_whom}/>
                    <div className="personal-page__main">
                        <div className="personal-page__information">
                            <h3 className="personal-page__name">{this.props.user_whom.name} {this.props.user_whom.surname}</h3>
                            <div className="personal-page__about-me">
                                {(this.props.user.id == this.props.user_whom.id) && (
                                    <Link className={'ico-dots'} to='/profile_edit'></Link>
                                )}

                                <div className="personal-page__string">
                                    <h4 className="personal-page__caption">Статус:</h4>
                                    <p className="personal-page__cell status"><UserStatusGenerator
                                        score={this.props.user_whom.score}/></p>
                                </div>
                                <div className="personal-page__string">
                                    <h4 className="personal-page__caption">Обо мне:</h4>
                                    <p className="personal-page__cell me">
                                        {this.props.user_whom.about}
                                    </p>
                                </div>
                                <div className="personal-page__string">
                                    <h4 className="personal-page__caption">Телефон:</h4>
                                    <p className="personal-page__cell phone">
                                        <a href={'tel:' + this.props.user_whom.phone}>{this.props.user_whom.phone}</a>
                                    </p>
                                </div>
                                {this.state.showMore ? (
                                    <div className="personal-page__string">
                                        <div className="personal-page__caption"></div>
                                        <a className="personal-page__hide" onClick={this.onHideMore}>Скрыть подробную
                                            информацию</a>
                                    </div>
                                ) : (
                                    <div className="personal-page__string">
                                        <div className="personal-page__caption"></div>
                                        <a className="personal-page__hide" onClick={this.onShowMore}>Показать подробную
                                            информацию</a>
                                    </div>
                                )}
                            </div>
                            {this.state.showMore && (
                                <div className="personal-page__details">
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">День рождения:</h4>
                                        <p className="personal-page__cell city"> {mysqlDatePipe(this.props.user_whom.birthday)}</p>
                                    </div>
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">Родной город:</h4>
                                        <p className="personal-page__cell city"> {this.props.user_whom.city}</p>
                                    </div>
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">Образование:</h4>
                                        <p className="personal-page__cell education"> {this.props.user_whom.education}</p>
                                    </div>
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">Почта:</h4>
                                        <a className="personal-page__cell mail"
                                           href="#">{this.props.user_whom.email}</a>
                                    </div>
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">Инстаграмм:</h4>
                                        <a className="personal-page__cell instagram" target='_blank'
                                           href={'https://www.instagram.com/' + this.props.user_whom.instagram}>{this.props.user_whom.instagram}</a>
                                    </div>
                                    <div className="personal-page__string">
                                        <h4 className="personal-page__caption">Вк:</h4>
                                        <a className="personal-page__cell vk" target='_blank' href={'https://vk.com/' + this.props.user_whom.vk}>{this.props.user_whom.vk}</a>
                                    </div>


                                    <h4 className="personal-page__caption">Чем любишь заниматься в свободное время:</h4>
                                    <p className="personal-page__hobby">
                                        {this.props.user_whom.hobby}
                                    </p>
                                    <h4 className="personal-page__caption">Любимая книга:</h4>
                                    <p className="personal-page__book">
                                        {this.props.user_whom.book}
                                    </p>
                                    <h4 className="personal-page__caption">Что для тебя самоуправление?</h4>
                                    <p className="personal-page__question">
                                        {this.props.user_whom.question}
                                    </p>
                                </div>


                            )}


                        </div>

                        <ProfileSendFormComponent
                            addWallItem={this.addWallItem}
                            user_whom={this.props.user_whom}
                            user={this.props.user}/>

                        <ProfileRecords
                            isLoginUser={this.props.isLoginUser}
                            onChangeAllRecords={this.onChangeAllRecords}
                            all_records={this.state.all_records}
                            wall={this.state.wall}
                            user_whom={this.props.user_whom}
                            onLoadMore={this.onLoadMore}
                            user={this.props.user}/>


                    </div>
                </div>
            </div>
        </section>)
    }

};


export default ProfilePersonComponent;