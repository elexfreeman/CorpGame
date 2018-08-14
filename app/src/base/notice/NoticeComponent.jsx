import React, {Component} from 'react';

import {rest_server} from '../../models/settings';


class NoticeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotice: false
        };

        this.onShowNotice = this.onShowNotice.bind(this);

    }

    onShowNotice() {
        this.setState({
            showNotice: !this.state.showNotice
        })
    }




    render() {
        return (<div className="header__notice-wrapper">
            <a className="header__notices" onClick={this.onShowNotice}>
                <div className="circle-notice">
                    <div className="notice-number">11</div>
                </div>
                <div className="icon-notice"></div>
            </a>
            {this.state.showNotice && (
                <div className="notice">
                    <h3 className="notice__title">Уведомления</h3>
                    <div className="notice__big-wrapper">
                        <ul className="notice__wrapper">
                            <li className="notice__card">
                                <a className="notice__link" href="#">
                                    <div className="notice__picture person-1">
                                        <div className="notice__icon like-picture"></div>
                                    </div>
                                    <div className="notice__adress">
                                        <div className="notice__somebody-name">Виктория&nbsp;<span
                                            className="notice__adress-text">похвалила Вас</span></div>
                                        <p className="notice__text">Спасибо за помощь в разборе Юона:)</p>
                                        <div className="notice__adress-wrapper">
                                            <div className="notice__like">1</div>
                                            <div className="notice__time">Два часа назад</div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="notice__card">
                                <a className="notice__link" href="#">
                                    <div className="notice__picture person-1">
                                        <div className="notice__icon bubble-picture"></div>
                                    </div>
                                    <div className="notice__adress">
                                        <div className="notice__somebody-name">Виктория&nbsp;<span
                                            className="notice__adress-text">добавила новую запись</span></div>
                                        <p className="notice__text">Спасибо за помощь в разборе Юона:)</p>
                                        <div className="notice__time">06.06.2018 в 14:00</div>
                                    </div>
                                </a>
                            </li>
                            <li className="notice__card">
                                <a className="notice__link" href="#">
                                    <div className="notice__picture person-1">
                                        <div className="notice__icon man-picture"></div>
                                    </div>
                                    <div className="notice__adress">
                                        <div className="notice__somebody-name">Виктория&nbsp;<span
                                            className="notice__adress-text">изминила информацию о себе</span></div>
                                        <div className="notice__time">06.06.2018 в 14:00</div>
                                    </div>
                                </a>
                            </li>
                            <li className="notice__card"><a className="notice__link" href="#">
                                <div className="notice__picture paper"></div>
                                <div className="notice__adress">
                                    <div className="notice__adress-text">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit.
                                    </div>
                                    <div className="notice__time">06.06.2018 в 14:00</div>
                                </div>
                            </a>
                            </li>
                            <li className="notice__card border-not">
                                <a className="notice__link" href="#">
                                    <div className="notice__picture star"></div>
                                    <div className="notice__adress">
                                        <div className="notice__adress-text">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit.
                                        </div>
                                        <div className="notice__time">06.06.2018 в 14:00</div>
                                    </div>
                                </a>
                            </li>
                            <li className="notice__card party-card">
                                <a className="notice__link party" href="#">
                                    <div className="notice__picture ico-party"></div>
                                    <div className="notice__adress">
                                        <div className="notice__adress-text">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing
                                            elit.
                                        </div>
                                        <div className="notice__time">06.06.2018 в 14:00</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a className="notice__show" href="#">Показать все уведомления</a>
                </div>
            )}

        </div>)
    }

};


export default NoticeComponent;