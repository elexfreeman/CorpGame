import {rest_server} from './settings';

/*отправляеет пожелани о системе*/
export function sendWish(wish) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wishes/sendWish",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , wish: wish
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

/*отправляеет пожелани о системе*/
export function getWishes(offset) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wishes/getWishes",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , offset: offset
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
