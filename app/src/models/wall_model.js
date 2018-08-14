import {rest_server} from './settings';

/*инфо по юзерам с очками*/
export function getUserWall(user_id, offset) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/getUserWall",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , user_id: user_id
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

/*инфо по юзерам с очками*/
export function getUserOnlyWall(user_id, offset) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/getUserOnlyWall",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , user_id: user_id
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

/*выдвет коменты под записью*/
export function getWallItemComments(wall_item_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/getWallItemComments",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , wall_item_id: wall_item_id
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

/*выдвет 2 коменты под записью*/
export function getWall2ItemComments(wall_item_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/getWall2ItemComments",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , wall_item_id: wall_item_id
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

/*отправляет лайк
* data = {
    parent: - 0 если корневой, иначе парент
    rule: тип лайка
    user_whom: кому
    content: содердимое

 }
* */
export function sendLike(data) {

    let formdata = new FormData();

    data.images.map((img, key) => {
        formdata.append('img'+key, img, img.name);
    });

    formdata.append('parent', data.parent);
    formdata.append('rule', data.rule);
    formdata.append('user_whom', data.user_whom);
    formdata.append('content', data.content);
    formdata.append('apikey', localStorage.getItem('apikey'));


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/sendLike",
            // The key needs to match your method's input parameter (case-sensitive).
            data : formdata,
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
export function getActivityWall(offset) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/getActivityWall",
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


/*инфо по юзерам с очками*/
export function deleteLike(like_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "wall/deleteLike",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , like_id: like_id
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

