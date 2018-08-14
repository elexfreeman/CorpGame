import React, {Component} from 'react';

import {rest_server} from '../../models/settings';
import {datePipe} from '../../base/pipes/date_pipe.js';
import WallItemComments from "./WallItemComments";
import Link from "react-router-dom/es/Link";
import {deleteLike, getWall2ItemComments, getWallItemComments, sendLike} from "../../models/wall_model";

import './wall_item.scss';
import {getImgUrl} from "../../models/images_model";
import {textPipe} from "../../base/pipes/text_pipe";

class WallItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllComments: false
            , startComment: false

            , showLikes: false

            , likes_count: parseInt(props.item.likes_count)
            , content: ''
            , selectedLike: 1

            , wall_comments: []

            , images: []
            , images64: []
            , onSending: false
            , deleted: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onShowComments = this.onShowComments.bind(this);
        this.onHideComments = this.onHideComments.bind(this);
        this.onStartComment = this.onStartComment.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.onShowDropLikesSelecter = this.onShowDropLikesSelecter.bind(this);
        this.onSelectLike = this.onSelectLike.bind(this);
        this.onAddImages = this.onAddImages.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.onDeleted = this.onDeleted.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadComments();
    };


    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    loadComments() {
        if (this.state.showAllComments) {
            getWallItemComments(this.props.item.id).then((data) => {
                this.setState({loader: false}, () => {

                    if (data.error) {
                        //  this.props.history.push("/")
                    } else {
                        if (data.wall_comments != null) {
                            this.setState({
                                auth: true,
                                wall_comments: data.wall_comments
                            });
                        }
                    }
                });
            }).catch((e) => {
                console.log(e);
            })
        } else {
            getWall2ItemComments(this.props.item.id).then((data) => {
                this.setState({loader: false}, () => {

                    if (data.error) {
                        //  this.props.history.push("/")
                    } else {
                        if (data.wall_comments != null) {
                            this.setState({
                                auth: true,
                                wall_comments: data.wall_comments
                            });
                        }
                    }
                });
            }).catch((e) => {
                console.log(e);
            })
        }

    }

    onShowComments() {
        this.setState({showAllComments: true}, () => this.loadComments());
    }

    onHideComments() {
        this.setState({showAllComments: false}, () => this.loadComments());
    }

    /*при клике начала коментирования*/
    onStartComment() {
        this.setState({
            startComment: true
        }, () => {
            document.getElementById('msg_box_' + this.props.item.id).focus();
        });
    }

    onChangeInput(event) {
        event.preventDefault();
        this.setState({content: event.target.value});
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

        this.setState({
            showLikes: false
        });
    }

    /*отправка комента*/
    onSend() {
        if ((this.state.content.length > 0)||(this.state.images.length>0)) {

            this.setState({
                onSending: true
            }, () => {
                document.getElementById('msg_box_' + this.props.item.id).value = "";
                sendLike({
                    parent: this.props.item.id
                    , rule: this.state.selectedLike
                    , user_whom: this.props.item.user_whom
                    , content: this.state.content
                    , images: this.state.images
                }).then((resp) => {
                    this.setState({
                        onSending: false
                    });
                    if (resp.error) {

                    } else {
                        this.setState({
                            showLikes: false
                            , content: ''
                            , selectedLike: 1
                            , likes_count: this.state.likes_count + 1
                            , images: []
                            , images64: []
                        }, () => this.loadComments());
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

    onDeleted() {
        this.setState({
            deleted: true
        }, () => {
            deleteLike(this.props.item.id).then((resp) => {

            })
        });
    }


    render() {
        return (
            <div>
                {!this.state.deleted && (

                    <li className="activity__card">

                        <div className="activity__main">

                            <div
                                style={{backgroundImage: 'url("' + getImgUrl(this.props.item.author_photoUrl) + '")'}}
                                className="activity__picture"></div>

                            <div className="activity__info-wrapper">
                                {this.props.item.author == this.props.item.user_whom ? (
                                    <div className="activity__adress">
                                        <Link className="activity__somebody-name"
                                              to={'/profile/' + this.props.item.author}>{this.props.item.author_name}</Link>
                                        <div className="activity__adress-text"> поделился/ась достижением</div>
                                        <p dangerouslySetInnerHTML={{__html: textPipe(this.props.item.content)}}
                                            className="activity__text"></p>
                                    </div>
                                ) : (
                                    <div className="activity__adress">
                                        <Link className="activity__somebody-name"
                                              to={'/profile/' + this.props.item.author}>{this.props.item.author_name}</Link>
                                        <div className="activity__adress-text">поблагодарил (а)</div>
                                        <Link className="activity__somebody-name"
                                              to={'/profile/' + this.props.item.user_whom}>{this.props.item.whom_name}</Link>
                                        <p className="activity__text">{this.props.item.content}</p>
                                    </div>
                                )}

                                <div className="reaction__images">
                                    {this.props.item.images.map((item_img2, key2) =>
                                        <img key={key2} className="reaction__img" src={getImgUrl(item_img2.img)}
                                             alt="picture"/>
                                    )}
                                </div>

                                <div className="activity__adress-wrapper">
                                    <div className="activity__like">{this.props.item.lr_caption}</div>
                                    <div className="activity__comments">{this.state.likes_count - 1}</div>
                                    &nbsp;&nbsp;
                                    <time className="activity__time"
                                          dateTime={datePipe(this.props.item.i_date)}>{datePipe(this.props.item.i_date)}</time>
                                </div>
                            </div>
                            {this.props.user.group == '2' && (
                                <div className='delete-button' onClick={this.onDeleted}>X</div>
                            )}
                        </div>


                        {(this.state.likes_count > 3) && (
                            <div style={{width: '100%'}}>
                                {this.state.showAllComments ? (
                                    <div className="show-wrapper hide" onClick={this.onHideComments}>
                                        <a className="hide-text">Скрыть все коментарии</a>
                                    </div>
                                ) : (
                                    <div className="show-wrapper hide" onClick={this.onShowComments}>
                                        <a className="hide-text">Показать
                                            все&nbsp; {this.state.likes_count - 1} комментариев</a>
                                    </div>
                                )}
                            </div>
                        )}


                        {((this.state.likes_count > 1)) && (
                            <WallItemComments wall_comments={this.state.wall_comments} item={this.props.item}/>
                        )}


                        <div s_id={this.props.item.id} className="activity__footer">


                            <div className={this.state.startComment ? ('dropdown dropdown--open') : ('dropdown')}
                                 onClick={this.onStartComment}>
                                <div className="avatar"
                                     style={{backgroundImage: 'url("' + getImgUrl(this.props.user.photoUrl) + '")'}}></div>


                                {this.state.images64.length > 0 && (
                                    <div className="reaction__images">
                                        {this.state.images64.map((img, key) =>
                                            <img key={key} className="reaction__img" src={img} alt="picture"/>
                                        )}
                                    </div>
                                )}

                                {!this.state.startComment ? (
                                    <d className="add-pictures">
                                        <div className="icon-image"></div>
                                    </d>
                                ) : (
                                    <a className="add-pictures">
                                        <div className="icon-image">
                                            <input className="add-pictures__form-control" onChange={this.onAddImages}
                                                   type='file'/>
                                        </div>
                                    </a>

                                )}

                                <div className="activity__comment-close">Комментировать</div>
                                <textarea
                                    id={'msg_box_' + this.props.item.id}
                                    onChange={this.onChangeInput}
                                    autoFocus={true}
                                    className="activity__comment-open" rows="3"
                                    name="awesome"
                                    placeholder="Комментировать"></textarea>

                                <div className="dropdown__like-wrapper">
                                    {!this.state.onSending && (
                                        <button className="btn-like" onClick={this.onSend}>Отправить</button>
                                    )}


                                    <a className="dropdown__toggle" onClick={this.onShowDropLikesSelecter}>


                                        <div className="dropdown__ico-selected">
                                            {(this.state.selectedLike == 1) && (
                                                <div className="dropdown__item ico-heart-1x">
                                                    1x
                                                </div>
                                            )}
                                            {(this.state.selectedLike == 2) && (
                                                <div className="dropdown__item ico-heart-2x">
                                                    1.2x
                                                </div>
                                            )}
                                            {(this.state.selectedLike == 3) && (
                                                <div className="dropdown__item ico-heart-3x">
                                                    1.5x
                                                </div>
                                            )}
                                            {(this.state.selectedLike == 4) && (
                                                <div className="dropdown__item ico-wow-2x">
                                                    2x
                                                </div>
                                            )}
                                        </div>

                                        <div className="dropdown__like-about">похвалить</div>

                                    </a>
                                </div>


                            </div>
                        </div>

                    </li>
                )}
            </div>
        )
    }

};


export default WallItem;