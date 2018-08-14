import React, {Component} from 'react';

/*генерирует статусы юзера*/
class UserStatusGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getStatus = this.getStatus.bind(this);
    }

    getStatus() {
        /*todo занести это дло в базу*/
        if (this.props.score < 150) return 'Юнга';
        if ((this.props.score > 150) && (this.props.score < 300)) return 'Бывалый';
        if (this.props.score >=300) return 'Морской волк';

    }


    render() {
        return (<span>{this.getStatus()}</span>)
    }

};


export default UserStatusGenerator;