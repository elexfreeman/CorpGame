import React, {Component} from 'react';
import {sendWish} from "../../models/wishes_model";

import './style.scss';

class SendWishComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_show: false
            , wish: ''
            , sendDone: false
        };

        this.onShowModal = this.onShowModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.send = this.send.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onShowModal() {
        this.setState({modal_show: true},
            () => {
                document.getElementById('msg_box_wish').focus();
            }
        );
    }

    onCloseModal() {
        this.setState({modal_show: false});
    }

    onChangeInput(event) {
        event.preventDefault();
        this.setState({wish: event.target.value});
    }

    send() {
        let that = this;
        if (this.state.wish.length > 0) {
            this.onCloseModal();

            this.setState({sendDone: true});

            setTimeout(() => {
                that.setState({sendDone: false});
            }, 3000);

            sendWish(that.state.wish).then((resp) => {

            })
        }
    }


    render() {
        return (<div>
            <button onClick={this.onShowModal} className="btn-send" type="button">Отправить идею</button>
            {this.state.modal_show && (
                <div className="modal--color">
                    <div className='popup-add'>
                        <div className="popup-add__component">
                            <button className="cancel" onClick={this.onCloseModal}>
                                <div className="ico-cancel"></div>
                            </button>
                            <div className="popup-add__wrapper">
                                <h3 className="popup-add__title">Отправить пожелание</h3>
                                <textarea
                                    id='msg_box_wish'
                                    onChange={this.onChangeInput}
                                    className="popup-add__comment"
                                    rows="3"
                                    name="awesome"></textarea>
                                <button className="btn-like" onClick={this.send}>Отправить</button>
                            </div>
                        </div>
                        <div className="popup-add__backdrop"></div>
                    </div>
                </div>
            )}

            {this.state.sendDone && (
                <div className="modal--color">
                    <div className='popup-add'>
                        <div className="popup-shipped">
                            <div className="popup-shipped__component">
                                <div className="icon-airplane"></div>
                                <p className="popup-shipped__about">Идея отправлена!</p>
                            </div>
                            <div className="popup-shipped__backdrop"></div>
                        </div>
                    </div>
                </div>
            )}

        </div>)
    }

};


export default SendWishComponent;