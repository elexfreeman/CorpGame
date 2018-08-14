import React, {Component} from 'react';

import {sendNews} from "../../../models/news_model";

class NewsAddAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: []
            , images64: []
            , title: ''
            , news: ''
        };
        this.onSendNews = this.onSendNews.bind(this);
        this.onAddImages = this.onAddImages.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.deleteImg = this.deleteImg.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


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
        if (event.target.id == 'add_title') {
            this.setState({title: event.target.value});
        }
        if (event.target.id == 'add_news') {
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
    deleteImg(event){
        event.preventDefault();

        let key =  event.target.getAttribute('img_key');
        if(key!=null){
            let tmpImg = this.state.images;
            let tmpImg64 = this.state.images64;

            delete tmpImg[parseInt(key)];
            delete tmpImg64[parseInt(key)];

            this.setState({
                images64: tmpImg64
                ,images: tmpImg
            });


        }
    }


    onSendNews() {
        if (this.state.title.length > 0) {
            document.getElementById('add_title').value = "";
            document.getElementById('add_news').value = "";
            sendNews({
                title: this.state.title
                , news: this.state.news
                , images: this.state.images
            }).then((resp) => {
                if (resp.error) {

                } else {
                    this.setState({
                        title: ''
                        , news: ''

                        , images: []
                        , images64: []
                    }, () => {
                        this.props.loadNews();
                    });
                }
            })
        }
    }


    render() {
        return (
            <li className="admin__item-card form-card">
                <div className="admin__text-container">
                    <div className="admin__selection-form" action="#">
                        <div className="admin__form-group new-form-group">
                            <label className="admin__form-text second" htmlFor="add_title">Новость</label>
                            <input onChange={this.onChangeInput} className="admin__form-control name-new-form-control"
                                   id="add_title" type="text"
                                   placeholder="Новости об организации питания в речном круизе"/>
                        </div>
                        <div className="admin__time new-form-time"></div>
                        <div className="admin__form-group form-group-last">
                            <label className="admin__form-text second" htmlFor="add_news">Описание</label>
                            <textarea
                                onChange={this.onChangeInput}
                                className="admin__form-control" id="add_news" rows="5"
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
                                            <div className="picture-close" img_key={key} ></div>
                                        </a>
                                    </div>
                                )}

                                <div className="admin__add-picture-btn add-picture-btn">
                                    <label className="admin__form-text second" htmlFor="photo">Прикрепить фото</label>
                                    <input className="admin__form-photo-control" onChange={this.onAddImages} type='file'
                                           multiple/>
                                    <div className="icon-cross"></div>
                                    <div className="ico-add"></div>
                                </div>
                            </div>





                        <div className="admin__line new-form-line">
                            <button onClick={this.onSendNews} className="admin__btn admin-btn">Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }

}


export default NewsAddAdminComponent;