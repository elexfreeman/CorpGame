import {rest_server} from './settings';

/*инфо по юзерам с очками*/
export function getMembersListTotalScore(limit) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "users/getMembersListTotalScore",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , limit: limit
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            failure: function (errMsg) {
                reject(errMsg);
            }
        });
    });
}

/*инфо по юзерам с очками*/
export function getMembersMembersLikes(limit) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "users/getMembersMembersLikes",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , limit: limit
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            failure: function (errMsg) {
                reject(errMsg);
            }
        });
    });
}

