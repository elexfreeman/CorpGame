import React, {Component} from 'react';
import {rest_server} from "../../../models/settings";
import {getBase64} from "../../../models/images_model";


class AddImgValComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.onAddImages = this.onAddImages.bind(this);
    }




    /*орабатывает при монтировании компонента*/
    componentDidMount() {

    };


    /*при обновлении props*/
    componentDidUpdate(prevProps) {

    }


    onAddImages(event) {
        event.preventDefault();
        let that = this;
        Array.from(event.target.files).forEach(function (file, i, files) {
            /*конфертируем в base64 ля превью*/
            getBase64(file).then(
                data => {
                    if(that.props.setPhoto){
                        that.props.setPhoto(data, file);
                    }
                }
            );
        });
    }


    render() {
        return (
            <div className="admin__add-picture-wrapper">
                <div className="admin__picture-container">
                    <div className={this.props.white ? ('admin__picture-wrapper white-icon-picture-wrapper'):('admin__picture-wrapper brown-icon-picture-wrapp')}>
                        <img
                            className={'admin__min-picture'}
                            src={this.props.photo} alt="picture" />
                    </div>
                </div>
                <div className="admin__add-picture-btn add-picture-btn">
                    <input
                        className="admin__form-photo-control"
                        id="avatarPhoto"
                        type="file" onChange={this.onAddImages} />

                    <div className="admin__add-text add-text">Изменить</div>
                </div>
            </div>
        )
    }
}

export default AddImgValComponent;