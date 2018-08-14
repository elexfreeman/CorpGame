import {rest_server} from './settings';

/*инфо по юзерам с очками*/
export function getListAdm(offset) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/getListAdm",
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
export function getList(offset, limit) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/getList",
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





/*инфо по юзерам с очками*/
export function getNewsItemImages(news_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/getNewsItemImages",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , news_id: news_id
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
export function getNewsSingle(news_id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/getNewsSingle",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , news_id: news_id
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


export function sendNews(data) {

    let formdata = new FormData();

    data.images.map((img, key) => {
        formdata.append('img' + key, img, img.name);
    });

    formdata.append('title', data.title);
    formdata.append('news', data.news);
    formdata.append('apikey', localStorage.getItem('apikey'));


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/sendNews",
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



export function updateNews(data) {

    let formdata = new FormData();

    data.images.map((img, key) => {
        formdata.append('img' + key, img, img.name);
    });

    formdata.append('news_id', data.news_id);
    formdata.append('title', data.title);
    formdata.append('news', data.news);
    formdata.append('apikey', localStorage.getItem('apikey'));


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/updateNews",
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


export function deleteNews(news_id) {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "news/deleteNews",
            // The key needs to match your method's input parameter (case-sensitive).
            data:  JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , news_id: news_id
            }),
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

