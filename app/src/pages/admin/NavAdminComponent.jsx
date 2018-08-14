import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavAdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (

            <aside className="admin__navigation">
                <ul className="admin__list">
                    <li className="admin__item">
                        <Link className="admin__link" to={'/admin_members'}>Участники</Link>
                    </li>
                    <li className="admin__item">
                        <Link className="admin__link" to={'/admin_news'}>Новости</Link>
                    </li>
                    <li className="admin__item">
                        <Link className="admin__link" to={'/admin_values'}>Ценности и условия</Link>
                    </li>
                    <li className="admin__item">
                        <Link className="admin__link" to={'/admin_wishes'}>Пожелания и идеи</Link>
                    </li>
                </ul>
            </aside>)
    }

}


export default NavAdminComponent;