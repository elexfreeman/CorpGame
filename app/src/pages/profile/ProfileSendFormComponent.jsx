import React, {Component} from 'react';
import {rest_server} from "../../models/settings";
import {sendLike} from "../../models/wall_model";


import './send_form.scss';

class ProfileSendFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLikes: false
            , content: ''
            , selectedLike: 1

            , images: []
            , images64: []
            ,onSending: false
        };

        this.onSend = this.onSend.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onShowLikes = this.onShowLikes.bind(this);
        this.onSelectLike = this.onSelectLike.bind(this);
        this.onShowDropLikesSelecter = this.onShowDropLikesSelecter.bind(this);

        this.onAddImages = this.onAddImages.bind(this);
        this.getBase64 = this.getBase64.bind(this);

    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    onAddImages(event) {
        event.preventDefault();

        let that = this;

        let tmp = [];
        Array.from(event.target.files).forEach(function (file, i, files) {
            tmp.push(file);
            /*конфертируем в base64 ля превью*/
            that.getBase64(file).then(
                data => {
                    let tmp64 = [];
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


    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };

    onChangeInput(event) {
        event.preventDefault();
        this.setState({content: event.target.value});
    }

    onShowLikes() {
        this.setState({
            showLikes: !this.state.showLikes
        })
    }

    /*говнокод селеккта лайков*/
    onSelectLike(event) {
        if (event.target.id == 'like_1') {
            this.setState({
                showLikes: false
                , selectedLike: 1
            })
        }
        if (event.target.id == 'like_2') {
            this.setState({
                showLikes: false
                , selectedLike: 2
            })
        }
        if (event.target.id == 'like_3') {
            this.setState({
                showLikes: false
                , selectedLike: 3
            })
        }
        if (event.target.id == 'like_4') {
            this.setState({
                showLikes: false
                , selectedLike: 4
            })
        }
    }


    /*отправка комента*/
    onSend() {

        if (this.state.content.length > 0) {
            /*вставляем статус отправки*/
            this.setState({
                onSending: true
            }, ()=>{
                sendLike({
                    parent: 0
                    , rule: this.state.selectedLike
                    , user_whom: this.props.user_whom.id
                    , content: this.state.content
                    , images: this.state.images
                }).then((resp) => {
                    resp = JSON.parse(resp);
                    this.setState({
                        onSending: true
                    });
                    if (resp.error) {

                    } else {

                        this.props.addWallItem(resp.item);
                        document.getElementById('msg_box').value = "";
                        this.setState({
                            showLikes: false
                            , content: ''
                            , selectedLike: 1
                            , images: []
                            , images64: []
                        });
                    }
                })
            });


        }


    }

    /*показывает список выбора лайков*/
    onShowDropLikesSelecter() {
        this.setState({
            showLikes: !this.state.showLikes
        });
    }

    render() {
        return (
            <div className="user-achievements">
                <h3 className="user-achievements__title">Достижения пользователя {this.props.user_whom.name}</h3>
                <div className="user-achievements__main">
                    <div className="user-achievements__picture"
                         style={{backgroundImage: 'url("' + rest_server + this.props.user.photoUrl + '")'}}
                    ></div>

                    <textarea id='msg_box' onChange={this.onChangeInput} className="user-achievements__comment" rows="3"
                              name="awesome"
                              placeholder="Похвалить"></textarea>
                </div>

                {this.state.images64.length > 0 && (
                    <div className="reaction__images achievements-image">
                        {this.state.images64.map((img, key) =>
                            <img key={key} className="reaction__img" src={img} alt="picture" />
                        )}
                    </div>
                )}

                <div className={this.state.showLikes ? ('dropdown-user dropdown--open') : ('dropdown-user')}>
                    <div className="dropdown__like-wrapper">

                        {!this.state.onSending && (
                            <button className="btn-like" onClick={this.onSend}>Отправить</button>
                        )}

                        <div className="add-pictures">
                                <label className="add-pictures__form-text second" htmlFor="photo">Прикрепить фото</label>
                                <input id="photo" className="add-pictures__form-control" onChange={this.onAddImages}
                                       type='file'/>
                            <div className="icon-image"></div>
                        </div>

                        <a className="dropdown__toggle" onClick={this.onShowDropLikesSelecter}>

                            <div className="dropdown__ico-selected">
                                {(this.state.selectedLike === 1) && (
                                    <div className="dropdown__item ico-heart-1x">
                                        1x
                                    </div>
                                )}
                                {(this.state.selectedLike === 2) && (
                                    <div className="dropdown__item ico-heart-2x">
                                        2x
                                    </div>
                                )}
                                {(this.state.selectedLike === 3) && (
                                    <div className="dropdown__item ico-heart-3x">
                                        3x
                                    </div>
                                )}
                                {(this.state.selectedLike === 4) && (
                                    <div className="dropdown__item ico-wow-2x">
                                        4x
                                    </div>
                                )}
                            </div>


                            <div className="ico-triangle"></div>
                        </a>
                    </div>
                    <div className="dropdown__menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown__item ico-heart-1x" id='like_1'
                           onClick={this.onSelectLike}>1X</a>

                        <a className="dropdown__item ico-heart-2x" id='like_2'
                           onClick={this.onSelectLike}>2X</a>

                        <a className="dropdown__item ico-heart-5x" id='like_3'
                           onClick={this.onSelectLike}>3X</a>

                        <a className="dropdown__item ico-wow-2x" id='like_4'
                           onClick={this.onSelectLike}>4X</a>

                    </div>
                </div>
            </div>)
    }

};


export default ProfileSendFormComponent;