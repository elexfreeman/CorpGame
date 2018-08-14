import React, {Component} from 'react';
import {rest_server} from '../../models/settings';
import {getUserScoreInfoById, updateAvatar} from "../../models/user_model";

class ProfileLeftBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: rest_server + this.props.user_whom.photoUrl
        };

        this.getBase64 = this.getBase64.bind(this);
        this.onAddImages = this.onAddImages.bind(this);

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*загружаем инфу score*/
        getUserScoreInfoById(this.props.user_whom.id).then((resp) => {
            if (!resp.error) {
                this.setState({
                    score: resp.score
                });
            }
        })
    };


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
        Array.from(event.target.files).forEach(function (file, i, files) {

            /*меняем аву*/
            updateAvatar({
                avatar: file
            }).then((resp) => {
                location.reload();
            });


            /*конфертируем в base64 ля превью*/
            that.getBase64(file).then(
                data => {
                    that.setState({
                        photo: data
                    })
                }
            );
        });
    }


    render() {
        return (<div className="personal-page__my-card">
            <div className="personal-page__photo-wrapper">
                <div  className="add-pictures">
                    {(this.props.user.id == this.props.user_whom.id) && (
                        <input id="avatarPhoto" className="add-pictures__form-control" onChange={this.onAddImages} type='file'></input>
                    )}

                    <div className="personal-page__picture" style={{backgroundImage: 'url("' + this.state.photo + '")'}}></div>
                </div>

                <div className="strip-like-max">
                    {this.state.score != null && (
                        <div style={{width: Math.round(100 * this.state.score.score / this.state.score.goal) + '%'}}
                             className="strip-like-min"></div>
                    )}
                </div>




                {this.state.score != null && (
                        <div
                            className="personal-page__percent">{Math.round(100 * this.state.score.score / this.state.score.goal)}%</div>
                )}



                {this.state.score != null && (
                    <div className="personal-page__like"></div>
                )}
            </div>

            {this.state.score != null && (
                <div className="personal-page__number-wrapper">
                    <div className="personal-page__remain">
                        <p className="personal-page__number">{this.state.score.score}</p>
                        <p className="personal-page__nuber-about">Похвалы</p>

                    </div>
                    <div className="personal-page__commended">
                        <p className="personal-page__number">{Math.round(this.state.score.user_likes)}</p>
                        <p className="personal-page__nuber-about">Похвалил/а</p>
                    </div>
                </div>
            )}

        </div>)
    }

};


export default ProfileLeftBlock;