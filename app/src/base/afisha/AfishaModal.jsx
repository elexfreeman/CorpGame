import React, {Component} from 'react';
import {sendAfisha} from "../../models/afisha_model";


class AfishaModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendDone: false
            , showAfishaModal: false
            , afisha: ''
            , title: ''
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.send = this.send.bind(this);

        this.onShowAfishaModal = this.onShowAfishaModal.bind(this);
        this.onHideAfishaModal = this.onHideAfishaModal.bind(this);
    }

    onShowAfishaModal() {
        this.setState({
            showAfishaModal: true
        }, () => {
            document.getElementById('msg_box_afisha').focus();
        });
    }

    onHideAfishaModal() {
        this.setState({
            showAfishaModal: false
        });
    }


    onChangeInput(event) {
        event.preventDefault();
        if (event.target.id == 'msg_box_afisha') {
            this.setState({afisha: event.target.value});
        }

        if (event.target.id == 'afisha_title') {
            this.setState({title: event.target.value});
        }


    }

    send() {
        let that = this;
        if (this.state.afisha.length > 0) {

            this.setState({sendDone: true});

            setTimeout(() => {
                that.setState({sendDone: false});
                that.onHideAfishaModal();
            }, 3000);

            sendAfisha(that.state.title, that.state.afisha).then((resp) => {
                if(that.props.reloadAfisha){
                    that.props.reloadAfisha();
                }

            })
        }
    }


    render() {
        return (
            <div>
                <a className="btn-to-share" onClick={this.onShowAfishaModal}>
                    <span>Поделись событием</span>
                    <div className="circle"></div>
                    <div className="icon-cross"></div>
                </a>
                <div className={this.state.showAfishaModal ? ('modal') : ('modal hidden')}>
                    {this.state.sendDone ? (
                        <div className="popup-add">
                            <div className="popup-shipped">
                                <div className="popup-shipped__component">
                                    <div className="icon-airplane"></div>
                                    <p className="popup-shipped__about">Событие добавлено</p>
                                </div>
                                <div className="popup-shipped__backdrop"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="popup-add">
                            <div className="popup-add__component">
                                <button className="cancel" onClick={this.onHideAfishaModal}>
                                    <div className="ico-cancel"></div>
                                </button>
                                <div className="popup-add__wrapper">
                                    <h3 className="popup-add__title">Поделись событием</h3>
                                    <input className='popup-add__input' id='afisha_title'
                                           onChange={this.onChangeInput}/>
                                    <textarea
                                        onChange={this.onChangeInput}
                                        className="popup-add__comment"
                                        rows="3"
                                        id="msg_box_afisha"></textarea>
                                    <button onClick={this.send} className="btn-like">Отправить</button>
                                </div>
                            </div>
                            <div className="popup-add__backdrop"></div>
                        </div>
                    )}

                </div>
            </div>)
    }

};


export default AfishaModal;