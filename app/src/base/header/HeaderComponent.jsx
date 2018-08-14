import React, {Component} from 'react';
import NavComponent from "../nav/NavComponent";
import {rest_server} from '../../models/settings';

import {Link} from 'react-router-dom'
import NoticeComponent from "../notice/NoticeComponent";
import {getList} from "../../models/company_values_model";
import {getCurentRound} from "../../models/rounds_model";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_open: false
            , c_values: []
        };
        this.logout = this.logout.bind(this);
        this.onOpenMenu = this.onOpenMenu.bind(this);
    }

    logout() {
        localStorage.removeItem('apikey');
        location.replace('/');
    }

    onOpenMenu() {
        this.setState({
            menu_open: !this.state.menu_open
        })
    }

    load() {
        getList().then((resp) => {
            this.setState({
                c_values: resp.values
            })
        });
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.load();
    };

    render() {
        return (<header className={'header ' + this.props.headclass}>
                <div className="container">
                    <div className="header__wrapper">
                        <Link to={'/'} className="year">2018-год доверия и объединения</Link>
                        <ul className="our-principles">
                            {this.state.c_values.map((item, key) =>
                                <li key={key} className="our-principles__item">
                                    <span className="ico-be-open"
                                          style={{
                                              backgroundImage: (this.props.headclass == 'header--dark')
                                                  ? ('url("' + rest_server + item.img_b + '")') :
                                                  ('url("' + rest_server + item.img_w + '")')
                                          }}
                                    ></span>
                                    <p className="our-principles__about open">{item.caption}</p>
                                </li>
                            )}

                        </ul>
                        <div onClick={this.onOpenMenu}
                             className={this.state.menu_open ? ('header__toggle btn-burger open') : ('header__toggle btn-burger')}>
                            <span></span><span></span><span></span><span></span>
                        </div>

                        <Link className="header__avatar" to={'/profile'}>
                            <div className="avatar"
                                 style={{backgroundImage: 'url("' + rest_server + this.props.user.photoUrl + '")'}}></div>
                            <div className="header__title"> {this.props.user.name}</div>
                        </Link>


                        <div onClick={this.logout} className="icon-exit"></div>
                    </div>
                    <NavComponent menu_open={this.state.menu_open} user={this.props.user}/>
                </div>
            </header>
        )
    }

};


export default HeaderComponent;