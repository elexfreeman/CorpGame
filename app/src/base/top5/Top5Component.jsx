import React, {Component} from 'react';
import {getMembersListTotalScore, getMembersMembersLikes} from "../../models/users_model";
import Member from "../../pages/members/Member";
import Link from "react-router-dom/es/Link";


class Top5Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
            , scored: true
        };

        this.loadMembersTotalScore = this.loadMembersTotalScore.bind(this);
        this.loadMembersLikes = this.loadMembersLikes.bind(this);
        this.onSelectScored = this.onSelectScored.bind(this);
        this.onSelectPraised = this.onSelectPraised.bind(this);
    }

    /*набрал*/
    loadMembersTotalScore() {
        getMembersListTotalScore(5).then((resp) => {
            if (!resp.error) {

                this.setState({
                    members: resp.members
                }, () => {

                })
            }
        }).catch((e) => {
            console.log(e);
            //<Member id={key} item={member}/>
        })
    }

    /*похвалил*/
    loadMembersLikes() {
        getMembersMembersLikes(5).then((resp) => {
            if (!resp.error) {

                this.setState({
                    members: resp.members
                }, () => {

                })
            }
        }).catch((e) => {
            console.log(e);
            //<Member id={key} item={member}/>
        })
    }

    /*набрал*/
    onSelectScored() {
        this.setState({
            scored: true
        }, () => {
            this.loadMembersTotalScore();
        })
    }

    /*похвалил*/
    onSelectPraised() {
        this.setState({
            scored: false
        }, () => {
            this.loadMembersLikes();
        })
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*загружаем инфу о юзерах*/
        this.loadMembersTotalScore();
    };



    render() {
        return (<section className="top-five-members">
            <div className="container">
                <h2 className="top-five-members__title title">Топ 5 участников</h2>
                <div className="btn-group">
                    <button onClick={this.onSelectScored}
                            className={this.state.scored ? ("btn active") : ("btn")}
                            type="button">Набрал
                    </button>
                    <button onClick={this.onSelectPraised}
                            className={!this.state.scored ? ("btn active") : ("btn")}
                            type="button">Похвалил
                    </button>
                </div>
                <ul className="top-five-members">
                    {this.state.members.map((item, key) =>
                        <div key={key}>
                            {this.state.scored ?(
                                <Member score={true}  item={item}/>
                            ):(
                                <Member item={item}/>
                            )}
                        </div>

                    )}
                    <li className="member__item last">
                        <Link className="member__link" to={'/members'}>
                            <div className="member__frame">
                                <div className="icon-user"></div>
                                <div className="member__text">Смотреть всех<br/>участников</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>)
    }

};


export default Top5Component;