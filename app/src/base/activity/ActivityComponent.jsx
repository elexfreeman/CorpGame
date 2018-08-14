import React, {Component} from 'react';

import {getActivityWall} from "../../models/wall_model";
import WallItem from "../../pages/profile/WallItem";

class ActivityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0
            , wall: []
        };

        this.onLoadMore = this.onLoadMore.bind(this);
        this.loadWall = this.loadWall.bind(this);
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        this.loadWall();
    };

    loadWall() {
        getActivityWall(this.state.offset).then((data) => {
            this.setState({loader: false}, () => {
                if (data.error) {
                    //  this.props.history.push("/")
                } else {
                    let tmp = this.state.wall;
                    this.setState({
                        auth: true
                        , wall: tmp.concat(data.wall)
                    });
                }
            });
        }).catch((e) => {
            console.log(e);
        })
    }

    onLoadMore() {
        this.setState({offset: this.state.offset + 10}, () => {
            this.loadWall()
        })

    }

    render() {
        return (<main className="activity">
            <h2 className="activity__title title">Активность</h2>

            <ul className="activity__wrapper">
                {this.state.wall.map((item, key) =>
                    <div  key={key}>
                        {item.rule != '6' && (
                            <WallItem user={this.props.user} item={item}/>
                        )}
                    </div>
                )}
            </ul>
            <button onClick={this.onLoadMore} className="btn-upload" type="button">Загрузить еще новости</button>
        </main>)
    }

};


export default ActivityComponent;