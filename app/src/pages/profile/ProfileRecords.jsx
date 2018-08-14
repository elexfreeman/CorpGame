import React, {Component} from 'react';


import WallItem from "./WallItem";


class ProfileRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }


    render() {
        return (
            <div>
                {this.props.isLoginUser ? (
                    <div className="btn-group">

                        <button onClick={this.props.onChangeAllRecords}
                                className={(this.props.all_records ? ('btn active') : ('btn'))} type="button">
                            Все записи
                        </button>

                        <button onClick={this.props.onChangeAllRecords}
                                className={(this.props.all_records ? ('btn') : ('btn active'))} type="button">
                            Мои записи
                        </button>

                    </div>
                ) : (
                    <div className="btn-group"></div>
                )}

                <ul className="activity__wrapper">
                    {this.props.wall.map((item, key) =>
                        <div key={key}>
                            {item.rule != '6' && (
                                <WallItem user={this.props.user} item={item}/>
                            )}
                        </div>
                    )}
                </ul>
                <button onClick={this.props.onLoadMore} className="btn-upload" type="button">Загрузить еще новости
                </button>
            </div>)
    }
};


export default ProfileRecords;