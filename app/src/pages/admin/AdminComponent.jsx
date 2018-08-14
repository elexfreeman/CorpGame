import React, {Component} from 'react';
import HeaderComponent from "../../base/header/HeaderComponent";


class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.props.setBg('body__background--light');
        this.state = {
            auth: false
            , loader: true
            , user: null
        };
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    render() {
        return (
            <div>
                <h1 className="berg-game second"></h1>
                <HeaderComponent history={this.props.history} headclass={'header--dark'} user={this.props.login_user}/>
                <section className="admin">
                    <div className="container">
                        <h2 className="admin__title title">Настройки администратора</h2>
                        <div className="admin__container">
                            <aside className="admin__navigation">
                                <ul className="admin__list">
                                    <li className="admin__item">
                                        <a className="admin__link" href="#">Участники</a>
                                    </li>
                                    <li className="admin__item">
                                        <a className="admin__link" href="#">Новости</a>
                                    </li>
                                    <li className="admin__item">
                                        <a className="admin__link" href="#">Ценности и
                                            условия</a>
                                    </li>
                                    <li className="admin__item">
                                        <a className="admin__link" href="#">Пожелания и
                                            идеи</a>
                                    </li>
                                </ul>
                            </aside>
                            <main className="admin__main">
                                <section className="admin__members">
                                    <h2 className="admin__main-title title">Участники</h2>
                                    <ul className="member">
                                        <li className="member__item">
                                            <a className="member__card" href="#">
                                                <div className="member__picture member-1">
                                                    <a className="admin__picture-close" href="#">
                                                        <div className="picture-close"></div>
                                                    </a>
                                                </div>
                                                <div className="member__praises">
                                                    <div className="member__number">154</div>
                                                    <div className="member__like">&nbsp похвалы</div>
                                                </div>
                                                <h3 className="member__name">Екатерина</h3>
                                                <p className="member__status">Юнга</p></a>
                                        </li>

                                    </ul>
                                </section>
                                <section className="admin__news">
                                    <h2 className="admin__main-title title">Новости</h2>
                                    <form className="admin__search-form" action="#">
                                        <div className="admin__form-group search-form-group">
                                            <label className="admin__form-text second" htmlFor="valueSearchName">Поиск
                                                по заголовку</label>
                                            <input className="admin__form-control search-form-control"
                                                   id="valueSearchName" type="text" name="valueSearchName"
                                                   placeholder="Поиск по заголовку"/>
                                        </div>
                                        <button className="admin__btn admin-btn" type="submit">
                                            <div className="icon-search"></div>
                                        </button>
                                        <div className="admin__sort-container">
                                            <p className="admin__sort-about">Сортировать по:</p>
                                            <div className="admin__sort-wrapper">
                                                <a className="admin__sort-to-present" href="#">Дате
                                                    <div className="to-present"></div></a>
                                                <a className="admin__sort-to-past hidden" href="#">
                                                    Дате <div className="to-past"></div>
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                    <a className="admin__add">
                                        <div className="admin__cross">
                                            <div className="icon-cross"></div>
                                        </div>
                                        <span className="admin__add-text">Добавить новость</span></a>
                                    <ul className="admin__list-card">
                                        <li className="admin__item-card item-new-card">
                                            <div className="admin__max-picture-wrapper"><img
                                                className="admin__picture" src="../images/meat.jpg" alt="picture"/>
                                            </div>
                                            <div className="admin__text-container new-container">
                                                <h3 className="admin__card-title">
                                                    Новости об организации питания в речном круизе
                                                </h3>
                                                <div className="admin__time">11 апреля 2018 в 14:00</div>
                                                <p className="admin__about">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Praesent tempor non turpis at placerat.
                                                    Nulla auctor ligula eget consectetur tincidunt.
                                                </p>
                                                <div className="admin__line line-new">
                                                    <a className="admin__replace-text" href="#">
                                                        <div className="ico-replace-text"></div>
                                                    </a>
                                                    <a className="admin__delete" href="#">
                                                        <div className="ico-delete"></div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                                <section className="admin__conditions-values">
                                    <div className="admin__values">
                                        <h2 className="admin__main-title title">Ценности</h2><a
                                        className="admin__add">
                                        <div className="admin__cross">
                                            <div className="icon-cross"></div>
                                        </div>
                                        <span className="admin__add-text">Добавить ценность</span></a>
                                        <ul className="admin__list-card">
                                            <li className="admin__item-card">
                                                <div className="admin__picture-container">
                                                    <div className="admin__icon icon-be-open"></div>
                                                    <a className="admin__replace-picture replace-picture">Изменить</a>
                                                </div>
                                                <div className="admin__text-container">
                                                    <div className="admin__line">
                                                        <h3 className="admin__card-title">Быть открытым Быть
                                                            открытым Быть открытым Быть открытым</h3>
                                                        <div className="admin__ico-wrapper"><a
                                                            className="admin__replace-text" href="#">
                                                            <div className="ico-replace-text"></div>
                                                        </a><a className="admin__delete" href="#">
                                                            <div className="ico-delete"></div>
                                                        </a></div>
                                                    </div>
                                                    <p className="admin__about">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Praesent tempor non turpis at placerat.
                                                        Nulla auctor ligula eget consectetur tincidunt.
                                                    </p>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="admin__conditions">
                                        <h2 className="admin__main-title title">Условия
                                            <div className="admin__item-card item-card-first">
                                                <p className="admin__about">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                                    sed risus malesuada erat mattis tempor.
                                                    Nunc semper libero vitae eros imperdiet, eget consequat ligula
                                                    molestie. Suspendisse vitae mauris tortor.
                                                    Fusce euismod lobortis velit, finibus mattis felis placerat a.
                                                    Donec in lacus ut ipsum cursus interdum ut sit amet nunc.
                                                    Donec fringilla justo leo, at rhoncus leo vulputate id. Morbi
                                                    fermentum vel metus ornare vestibulum.
                                                    Nullam lacinia tellus vitae sapien sodales eleifend.
                                                </p><a className="admin__replace-text" href="#">
                                                <div className="ico-replace-text"></div>
                                            </a>
                                            </div><a className="admin__add">
                                                <div className="admin__cross">
                                                    <div className="icon-cross"></div>
                                                </div>
                                                <span className="admin__add-text">Добавить уровень</span></a>
                                            <ul className="admin__list-card">
                                                <li className="admin__item-card">
                                                    <div className="admin__text-container">
                                                        <div className="admin__line">
                                                            <h3 className="admin__card-title">3 уровень</h3><a
                                                            className="admin__replace-text" href="#">
                                                            <div className="ico-replace-text"></div>
                                                        </a><a className="admin__delete" href="#">
                                                            <div className="ico-delete"></div>
                                                        </a>
                                                        </div>
                                                        <p className="admin__about-point"><span
                                                            className="admin__text-point">Баллов для достижения:</span><span
                                                            className="admin__point">300</span><span
                                                            className="admin__text-point">Награда:</span><span
                                                            className="admin__point">30 000 &#8381;</span></p>
                                                        <p className="admin__about">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                            Praesent tempor non turpis at placerat.
                                                            Nulla auctor ligula eget consectetur tincidunt.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="admin__item-card form-card">
                                                    <div className="admin__text-container">
                                                        <div className="admin__line">
                                                            <h3 className="admin__card-title">3 уровень</h3>
                                                            <a className="admin__delete ico-delete" href="#"></a>
                                                        </div>
                                                        <div className="admin__selection-form" action="#">
                                                            <div className="admin__form-group-container">
                                                                <div
                                                                    className="admin__form-group number-form-group">
                                                                    <label className="admin__form-text"
                                                                           htmlFor="valueNumber">Баллов для
                                                                        достижения:</label>
                                                                    <div className="admin__button-group">
                                                                        <button className="admin__btn minus-btn"
                                                                                type="button">-
                                                                        </button>
                                                                        <input
                                                                            className="admin__form-number-control"
                                                                            id="valueNumber" type="number"
                                                                            name="valueNumber" placeholder="300"/>
                                                                        <button className="admin__btn plus-btn"
                                                                                type="button">+
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="admin__form-group number-form-group rubl-form-group">
                                                                    <label
                                                                        className="admin__form-text form-rubl-text"
                                                                        htmlFor="valueRubl">Награда:</label>
                                                                    <input
                                                                        className="admin__form-control rubl-form-control"
                                                                        id="valueRubl" type="text" name="valueRubl"
                                                                        placeholder="30 000 ₽"/>
                                                                </div>
                                                            </div>
                                                            <div className="admin__form-group form-group-last">
                                                                <label className="admin__form-text second"
                                                                       htmlFor="valueText">Описание</label>
                                                                <textarea className="admin__form-control"
                                                                          id="valueText" rows="5" name="valueText"
                                                                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor non turpis at placerat. Nulla auctor ligula eget consectetur tincidunt."></textarea>
                                                            </div>
                                                            <button className="admin__btn admin-btn"
                                                                    type="submit">Сохранить изменения
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="admin__item-card">
                                                    <div className="admin__text-container">
                                                        <div className="admin__line">
                                                            <h3 className="admin__card-title">2 уровень</h3><a
                                                            className="admin__replace-text" href="#">
                                                            <div className="ico-replace-text"></div>
                                                        </a><a className="admin__delete" href="#">
                                                            <div className="ico-delete"></div>
                                                        </a>
                                                        </div>
                                                        <p className="admin__about-point"><span
                                                            className="admin__text-point">Баллов для достижения:</span><span
                                                            className="admin__point">200</span><span
                                                            className="admin__text-point">Награда:</span><span
                                                            className="admin__point">20 000 &#8381;</span></p>
                                                        <p className="admin__about">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                            Praesent tempor non turpis at placerat.
                                                            Nulla auctor ligula eget consectetur tincidunt.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="admin__item-card">
                                                    <div className="admin__text-container">
                                                        <div className="admin__line">
                                                            <h3 className="admin__card-title">1 уровень</h3><a
                                                            className="admin__replace-text" href="#">
                                                            <div className="ico-replace-text"></div>
                                                        </a><a className="admin__delete" href="#">
                                                            <div className="ico-delete"></div>
                                                        </a>
                                                        </div>
                                                        <p className="admin__about-point"><span
                                                            className="admin__text-point">Баллов для достижения:</span><span
                                                            className="admin__point">100</span><span
                                                            className="admin__text-point">Награда:</span><span
                                                            className="admin__point">10 000 &#8381;</span></p>
                                                        <p className="admin__about">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                            Praesent tempor non turpis at placerat.
                                                            Nulla auctor ligula eget consectetur tincidunt.
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </h2>
                                    </div>
                                </section>
                                <section className="admin__wishes-ideas">
                                    <h2 className="admin__main-title title">Пожелания и идеи</h2>
                                    <form className="admin__search-form" action="#">
                                        <div className="admin__form-group search-form-group">
                                            <label className="admin__form-text second" htmlFor="valueSearchName">Поиск
                                                по заголовку</label>
                                            <input className="admin__form-control search-form-control"
                                                   id="valueSearchName" type="text" name="valueSearchName"
                                                   placeholder="Поиск по заголовку"/>
                                        </div>
                                        <button className="admin__btn admin-btn" type="submit">
                                            <div className="icon-search"></div>
                                        </button>
                                        <div className="admin__sort-container">
                                            <p className="admin__sort-about">Сортировать по:</p>
                                            <div className="admin__sort-wrapper"><a
                                                className="admin__sort-to-present" href="#">Дате
                                                <div className="to-present"></div></a><a
                                                className="admin__sort-to-past hidden" href="#">Дате
                                                <div className="to-past"></div></a></div>
                                        </div>
                                    </form>
                                    <a className="admin__add">
                                        <div className="admin__cross">
                                            <div className="icon-cross"></div>
                                        </div>
                                        <span className="admin__add-text">Добавить пожелание</span></a><a
                                    className="admin__add">
                                    <div className="admin__cross">
                                        <div className="icon-cross"></div>
                                    </div>
                                    <span className="admin__add-text">Добавить идею</span></a>
                                    <ul className="admin__list-card">
                                        <li className="admin__item-card item-new-card">
                                            <div className="admin__max-picture-wrapper">
                                                <img className="admin__picture" src="../images/meat.jpg" alt="picture"/>
                                            </div>
                                            <div className="admin__text-container new-container">
                                                <h3 className="admin__card-title">Пожелание</h3>
                                                <div className="admin__time">11 апреля 2018 в 14:00</div>
                                                <p className="admin__about">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Praesent tempor non turpis at placerat.
                                                    Nulla auctor ligula eget consectetur tincidunt.
                                                </p>
                                                <div className="admin__line line-new">
                                                    <a className="admin__replace-text" href="#">
                                                        <div className="ico-replace-text"></div>
                                                    </a>
                                                    <a className="admin__delete" href="#">
                                                        <div className="ico-delete"></div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="admin__item-card form-card">
                                            <div className="admin__text-container">
                                                <form className="admin__selection-form" action="#">
                                                    <div className="admin__form-group new-form-group">
                                                        <label className="admin__form-text second"
                                                               htmlFor="valueNameWishes">Пожелание</label>
                                                        <input className="admin__form-control name-new-form-control"
                                                               id="valueNameWishes" type="text"
                                                               name="valueNameWishes" placeholder="Пожелание"/>
                                                    </div>
                                                    <div className="admin__time new-form-time">11 апреля 2018 в
                                                        14:00
                                                    </div>
                                                    <div className="admin__form-group form-group-last">
                                                        <label className="admin__form-text second"
                                                               htmlFor="valueText">Описание</label>
                                                        <textarea className="admin__form-control" id="valueText"
                                                                  rows="5" name="valueText"
                                                                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor non turpis at placerat. Nulla auctor ligula eget consectetur tincidunt."></textarea>
                                                    </div>
                                                    <div className="admin__line-picture">
                                                        <div className="admin__picture-container">
                                                            <div className="admin__picture-wrapper">
                                                                <img mclassName="admin__min-picture"
                                                                     src="../images/meat.jpg" alt="picture"/>
                                                            </div>
                                                            <a className="admin__picture-close" href="#">
                                                                <div className="picture-close"></div>
                                                            </a>
                                                        </div>
                                                        <div className="admin__add-picture-btn add-picture-btn">
                                                            <label className="admin__form-text second"
                                                                   htmlFor="photo">Прикрепить фото</label>
                                                            <input className="admin__form-photo-control" id="photo"
                                                                   type="file" accept="image/*" name="photos"
                                                                   multiple/>
                                                            <div className="icon-cross"></div>
                                                            <div className="ico-add"></div>
                                                        </div>
                                                    </div>
                                                    <div className="admin__line new-form-line">
                                                        <button className="admin__btn admin-btn"
                                                                type="submit">Сохранить изменения
                                                        </button>
                                                        <a className="admin__delete ico-delete" href="#"></a>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                        <li className="admin__item-card item-new-card">
                                            <div className="admin__max-picture-wrapper">
                                                <img className="admin__picture" src="../images/meat.jpg" alt="picture"/>
                                            </div>
                                            <div className="admin__text-container new-container">
                                                <h3 className="admin__card-title">Идея</h3>
                                                <div className="admin__time">11 апреля 2018 в 14:00</div>
                                                <p className="admin__about">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Praesent tempor non turpis at placerat.
                                                    Nulla auctor ligula eget consectetur tincidunt.
                                                </p>
                                                <div className="admin__line line-new"><a
                                                    className="admin__replace-text" href="#">
                                                    <div className="ico-replace-text"></div>
                                                </a><a className="admin__delete" href="#">
                                                    <div className="ico-delete"></div>
                                                </a></div>
                                            </div>
                                        </li>
                                        <li className="admin__item-card form-card">
                                            <div className="admin__text-container">
                                                <form className="admin__selection-form" action="#">
                                                    <div className="admin__form-group new-form-group">
                                                        <label className="admin__form-text second"
                                                               htmlFor="valueNameIdeas">Идея</label>
                                                        <input className="admin__form-control name-new-form-control"
                                                               id="valueNameIdeas" type="text" name="valueNameIdeas"
                                                               placeholder="Идея"/>
                                                    </div>
                                                    <div className="admin__time new-form-time">11 апреля 2018 в
                                                        14:00
                                                    </div>
                                                    <div className="admin__form-group form-group-last">
                                                        <label className="admin__form-text second"
                                                               htmlFor="valueText">Описание</label>
                                                        <textarea className="admin__form-control" id="valueText"
                                                                  rows="5" name="valueText"
                                                                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                                  Praesent tempor non turpis at placerat. Nulla auctor ligula eget consectetur tincidunt."></textarea>
                                                    </div>
                                                    <div className="admin__line-picture">
                                                        <div className="admin__picture-container">
                                                            <div className="admin__picture-wrapper">
                                                                <img className="admin__min-picture"
                                                                     src="../images/meat.jpg" alt="picture"/>
                                                            </div>
                                                            <a className="admin__picture-close" href="#">
                                                                <div className="picture-close"></div>
                                                            </a>
                                                        </div>
                                                        <div className="admin__add-picture-btn add-picture-btn">
                                                            <label className="admin__form-text second"
                                                                   htmlFor="photo">Прикрепить фото</label>
                                                            <input className="admin__form-photo-control" id="photo"
                                                                   type="file" accept="image/*" name="photos"
                                                                   multiple/>
                                                            <div className="icon-cross"></div>
                                                            <div className="ico-add"></div>
                                                        </div>
                                                    </div>
                                                    <div className="admin__line new-form-line">
                                                        <button className="admin__btn admin-btn"
                                                                type="submit">Сохранить изменения
                                                        </button>
                                                        <a className="admin__delete ico-delete" href="#"></a>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
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


export default AdminComponent;