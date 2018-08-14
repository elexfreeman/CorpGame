import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>

                {(this.props.user.group == 2) ? (
                    <nav className={this.props.menu_open ? ('nav-admin open') : ('nav-admin')}>
                        <Link className="nav__link" to={'/'}>Главная</Link>
                        <Link className="nav__link" to={'/members'}>Участники</Link>
                        <Link className="nav__link" to={'/terms_and_conditions'}>Условия и ценности</Link>
                        <Link className="nav__link" to={'/news'}>Новости</Link>
                        <Link className="nav__link" to={'/afisha'}>Афиша</Link>
                        <Link className="nav__link" to={'/admin_members'}>Настройки администратора</Link>
                    </nav>
                ):(
                    <nav className={this.props.menu_open ? ('nav open') : ('nav')}>
                        <Link className="nav__link" to={'/'}>Главная</Link>
                        <Link className="nav__link" to={'/members'}>Участники</Link>
                        <Link className="nav__link" to={'/terms_and_conditions'}>Условия и ценности</Link>
                        <Link className="nav__link" to={'/news'}>Новости</Link>
                        <Link className="nav__link" to={'/afisha'}>Афиша</Link>
                    </nav>
                )}
            </div>
        )
    }

};


export default NavComponent;