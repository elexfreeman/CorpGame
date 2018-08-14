import React, {Component} from 'react';

import {rest_server} from "../../../models/settings";
import {deleteNews, getNewsItemImages, sendNews, updateNews} from "../../../models/news_model";
import {dateTimePipe} from "../../../base/pipes/date_pipe";
import {textPipe} from "../../../base/pipes/text_pipe";

class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_edit_form: false
            , images: []
            , images64: []
            , deleted: false

        };

        this.sliceStr = this.sliceStr.bind(this);
        this.onEditFormShow = this.onEditFormShow.bind(this);

        this.onAddImages = this.onAddImages.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.deleteImg = this.deleteImg.bind(this);
        this.onUpdateNews = this.onUpdateNews.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {


    };

    sliceStr(str) {
        return str;
        /*if (str != null)
            return str.slice(0, 400) + '...';*/
    }

    onEditFormShow() {
        this.setState({
            show_edit_form: true
            , title: this.props.item.title
            , news: this.props.item.news
            , news_id: this.props.item.id
        }, () => {
            /*вставляем в инпуты значения*/
            document.getElementById('edit_title').value = this.props.item.title;
            document.getElementById('edit_news').value = this.props.item.news;
            /*получаем картинки с сервера*/
            getNewsItemImages(this.props.item.id).then((resp) => {
                /*генерим масив картинок*/
                if (resp.news_images != null) {
                    let images = [];
                    let images64 = [];
                    resp.news_images.map((val, key) => {
                        images.push(rest_server + val.img);
                        images64.push(rest_server + val.img);
                    });
                    this.setState({
                        images64: images64
                        , images: images
                    })
                }
            })
        })
    }


    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    onChangeInput(event) {
        event.preventDefault();
        if (event.target.id == 'edit_title') {
            this.setState({title: event.target.value});
        }
        if (event.target.id == 'edit_news') {
            this.setState({news: event.target.value});
        }
    }

    onAddImages(event) {
        event.preventDefault();

        let that = this;

        let tmp = this.state.images;
        Array.from(event.target.files).forEach(function (file, i, files) {
            tmp.push(file);
            /*конфертируем в base64 ля превью*/
            that.getBase64(file).then(
                data => {
                    let tmp64 = that.state.images64;
                    tmp64.push(data);
                    that.setState({
                        images64: tmp64
                    })

                }
            );
        });


        /*массив картинок*/
        this.setState({
            images: tmp
        });
    }

    /*удаляет добавленную картинку*/
    deleteImg(event) {
        event.preventDefault();

        let key = event.target.getAttribute('img_key');
        if (key != null) {
            let tmpImg = this.state.images;
            let tmpImg64 = this.state.images64;

            delete tmpImg[parseInt(key)];
            delete tmpImg64[parseInt(key)];

            this.setState({
                images64: tmpImg64
                , images: tmpImg
            });
        }
    }


    onUpdateNews() {
        if (this.state.title.length > 0) {
            document.getElementById('edit_title').value = "";
            document.getElementById('edit_news').value = "";
            updateNews({
                title: this.state.title
                , news: this.state.news
                , images: this.state.images
                , news_id: this.state.news_id
            }).then((resp) => {
                if (resp.error) {

                } else {
                    this.setState({
                        title: ''
                        , news: ''

                        , images: []
                        , images64: []
                    }, () => {

                    });
                }
            })
        }
    }

    deleteNews() {
        this.setState({
            deleted: true
        });

        deleteNews(this.props.item.id).then((resp) => {
            if (resp.error) {

            } else {

            }
        })

    }


    render() {
        return (

            <div>
                {!this.state.deleted && (
                    <div>
                        {this.state.show_edit_form ? (
                            <li className="admin__item-card item-new-card">
                                <div className="admin__text-container">
                                    <div className="admin__selection-form" action="#">
                                        <div className="admin__form-group new-form-group">
                                            <label className="admin__form-text second"
                                                   htmlFor="add_title">Новость</label>
                                            <input onChange={this.onChangeInput}
                                                   className="admin__form-control name-new-form-control"
                                                   id="edit_title" type="text"
                                                   placeholder="Новости об организации питания в речном круизе"/>
                                        </div>
                                        <div className="admin__time new-form-time"></div>
                                        <div className="admin__form-group form-group-last">
                                            <label className="admin__form-text second"
                                                   htmlFor="add_news">Описание</label>
                                            <textarea
                                                onChange={this.onChangeInput}
                                                className="admin__form-control" id="edit_news" rows="5"
                                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                       Praesent tempor non turpis at placerat. Nulla auctor ligula eget consectetur tincidunt."></textarea>
                                        </div>


                                        <div className="admin__min-picture-wrapper">
                                            {this.state.images64.map((img, key) =>
                                                <div key={key} className='admin__picture-container'>
                                                    <div key={key} className="admin__picture-wrapper">
                                                        <img className="admin__min-picture" src={img} alt="picture"/>
                                                    </div>
                                                    <a className="admin__picture-close" onClick={this.deleteImg}>
                                                        <div className="picture-close" img_key={key}></div>
                                                    </a>
                                                </div>
                                            )}

                                            <div className="admin__add-picture-btn add-picture-btn">
                                                <label className="admin__form-text second" htmlFor="photo">Прикрепить
                                                    фото</label>
                                                <input className="admin__form-photo-control" onChange={this.onAddImages}
                                                       type='file'
                                                       multiple/>
                                                <div className="icon-cross"></div>
                                                <div className="ico-add"></div>
                                            </div>
                                        </div>
                                        <div className="admin__line new-form-line">
                                            <button onClick={this.onUpdateNews}
                                                    className="admin__btn admin-btn">Сохранить
                                                изменения
                                            </button>
                                            <a className="admin__delete ico-delete" onClick={this.deleteNews}></a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li className="admin__item-card item-new-card">
                                <div className="admin__max-picture-wrapper">
                                    <img className="admin__picture" src={rest_server + this.props.item.news_img}
                                         alt="picture"/>
                                </div>
                                <div className="admin__text-container new-container">
                                    <h3 className="admin__card-title">
                                        {this.props.item.title}
                                    </h3>
                                    <div className="admin__time">{dateTimePipe(this.props.item.i_date)}</div>
                                    <p className="admin__about"
                                       dangerouslySetInnerHTML={{__html: textPipe(this.props.item.news)}}></p>
                                    <div className="admin__line line-new">
                                        <a className="admin__replace-text" onClick={this.onEditFormShow}>
                                            <div className="ico-replace-text"></div>
                                        </a>
                                        <a className="admin__delete"  onClick={this.deleteNews}>
                                            <div className="ico-delete"></div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )
                        }
                    </div>
                )}

            </div>
        )
    }

}


export default NewsItem;