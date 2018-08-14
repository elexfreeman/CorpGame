import React, {Component} from 'react';
import Member from "./Member";
import {getMembersListTotalScore, getMembersMembersLikes} from "../../models/users_model";


class MembersListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
            , scored: true
        };

        this.loadMembersTotalScore = this.loadMembersTotalScore.bind(this);
        this.onSelectScored = this.onSelectScored.bind(this);
        this.onSelectPraised = this.onSelectPraised.bind(this);
    }


    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        /*загружаем инфу о юзерах*/
        this.loadMembersTotalScore();
    };


    /*набрал*/
    loadMembersTotalScore() {
        getMembersListTotalScore().then((resp) => {
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
        getMembersMembersLikes().then((resp) => {
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


    render() {
        return (<section className="members">
            <div className="container">
                <h2 className="title">Участники</h2>
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
                <ul className="member">
                    {this.state.members.map((item, key) =>
                        <div key={key}>
                            {this.state.scored ?(
                                <Member score={true}  item={item}/>
                            ):(
                                <Member item={item}/>
                            )}
                        </div>
                    )}
                </ul>
            </div>
        </section>)
    }

};


export default MembersListComponent;