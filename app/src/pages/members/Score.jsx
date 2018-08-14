import React from 'react';


const Score = ({score}) => {

    const score_item = 'спасибо';
    const score_null = 'Не похвалил!';

    function scoreNumber() {
        if (score == null) {
            return '';
        } else {
            return parseInt(score);
        }
    }

    function scoreText() {
        if (score == null) {
            return score_null;
        } else {
            if (parseInt(score) == 1) return parseFloat(score).toFixed(0) + ' ' + score_item;
            if (parseInt(score) == 2) return parseFloat(score).toFixed(0) + ' ' + score_item;
            if (parseInt(score) == 3) return parseFloat(score).toFixed(0) + ' ' + score_item;
            if (parseInt(score) > 3) return parseFloat(score).toFixed(0) + ' ' + score_item;
        }
        //<div className="member__like">&nbsp; похвалы</div>
    }

    return (
        <div className="member__like">{scoreText()}</div>
    )

};
export default Score;
