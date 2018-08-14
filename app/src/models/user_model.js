import {rest_server} from './settings';

// инфо об юзере п ключу
export function getUserInfoByApiKey() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/getUserInfo",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
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

export function updateUserInfo(arg) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/updateUserInfo",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , data: arg
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


export function getUserInfoById(user_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/getUserInfoById",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , user_id: user_id
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


export function login(login, password) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/login",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                login: login
                , password: password
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


export function getUserScoreInfoById(user_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/getUserScoreInfoById",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , user_id: user_id
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


export function updateAvatar(data) {

    let formdata = new FormData();

    formdata.append('avatar', data.avatar,  data.avatar.name);
    formdata.append('apikey', localStorage.getItem('apikey'));


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "user/updateAvatar",
            // The key needs to match your method's input parameter (case-sensitive).
            data: formdata,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType

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
export function deleteUser(user_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "user/deleteUser",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , user_id: user_id
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

