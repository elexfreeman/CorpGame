import {rest_server} from './settings';

/*отправляеет афишу о системе*/
export function sendAfisha(title, afisha) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "afisha/sendAfisha",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , afisha: afisha
                , title: title
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

/*отправляеет афишу о системе*/
export function getList(offset, limit) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "afisha/getList",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , offset: offset
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

/*отправляеет афишу о системе*/
export function get(afisha_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "afisha/get",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , afisha_id: afisha_id
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
