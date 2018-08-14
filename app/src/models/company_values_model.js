import {rest_server} from './settings';

/*инфо по юзерам с очками*/
export function getList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "company_values/getList",
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


export function update(data) {

    let formdata = new FormData();

    if (data.img_file_w != null) {
        formdata.append('img_file_w', data.img_file_w, data.img_file_w.name);
    }

    if (data.img_file_b != null) {
        formdata.append('img_file_b', data.img_file_b, data.img_file_b.name);
    }

    formdata.append('apikey', localStorage.getItem('apikey'));
    formdata.append('caption', data.caption);
    formdata.append('description', data.description);
    formdata.append('id', data.id);


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "company_values/update",
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

export function deleted(id) {

    let formdata = new FormData();
    formdata.append('apikey', localStorage.getItem('apikey'));
    formdata.append('id', id);

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "company_values/deleted",
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


export function add(data) {

    let formdata = new FormData();

    if (data.img_file_w != null) {
        formdata.append('img_file_w', data.img_file_w, data.img_file_w.name);
    }

    if (data.img_file_b != null) {
        formdata.append('img_file_b', data.img_file_b, data.img_file_b.name);
    }

    formdata.append('apikey', localStorage.getItem('apikey'));
    formdata.append('caption', data.caption);
    formdata.append('description', data.description);


    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: rest_server + "company_values/add",
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