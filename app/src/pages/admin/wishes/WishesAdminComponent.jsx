import React, {Component} from 'react';
import HeaderComponent from "../../../base/header/HeaderComponent";


import {rest_server} from "../../../models/settings";
import {getWishes} from "../../../models/wishes_model";
import {datePipe, dateTimePipe} from "../../../base/pipes/date_pipe";
import NavAdminComponent from "../NavAdminComponent";
import {textPipe} from "../../../base/pipes/text_pipe";


class WishesAdminComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            wishes: []
        };
        this.load = this.load.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
    };

    sliceStr(str) {
        return str;
        /*if (str != null)
            return str.slice(0, 400) + '...';*/
    }

    load() {
        getWishes(0).then((resp) => {
            this.setState({
                wishes: resp.wishes.rows
            })
        })
    }


    render() {
        return (

            <div>
                <h1 className="berg-game second"></h1>
                <HeaderComponent history={this.props.history} headclass={'header--dark'} user={this.props.login_user}/>
                <section className="admin">
                    <div className="container">
                        <h2 className="admin__title title">Настройки администратора</h2>
                        <div className="admin__container">
                            <NavAdminComponent/>
                            <main className="admin__main">

                                <section className="admin__wishes-ideas">
                                    <h2 className="admin__main-title title">Пожелания и идеи</h2>


                                    <ul className="admin__list-card">
                                        {this.state.wishes.map((item, key) => (
                                            <li key={key} className="admin__item-card item-new-card">
                                                <div className="admin__max-picture-wrapper">
                                                    <img className="admin__picture" src={rest_server + item.photoUrl}
                                                         alt="picture"/>
                                                </div>
                                                <div className="admin__text-container new-container">
                                                    <h3 className="admin__card-title">Пожелание от {item.name}</h3>
                                                    <div className="admin__time">{dateTimePipe(item.i_date)}</div>
                                                    <p className="admin__about" dangerouslySetInnerHTML={{__html: textPipe(item.wish)}}></p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                            </main>
                        </div>
                    </div>
                </section>
            </div>


        )
    }

}


export default WishesAdminComponent;