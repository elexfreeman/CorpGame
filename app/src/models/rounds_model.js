import {rest_server} from './settings';

/*инфо по юзерам с очками*/
export function getRoundsList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/getRoundsList",
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


/*инфо по юзерам с очками*/
export function getCurentRound() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/getCurentRound",
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


export function updateRound(description) {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/updateRound",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , description: description
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
export function getGoalsList() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/getGoalsList",
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


/*инфо по юзерам с очками*/
export function getFinishGoal() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/getFinishGoal",
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


export function deleteGoal(id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/deleteGoal",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({
                apikey: localStorage.getItem('apikey')
                , id: id
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


export function updateGoal(data) {
    data.apikey = localStorage.getItem('apikey');
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/updateGoal",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(data),
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


export function addGoal(data) {
    data.apikey = localStorage.getItem('apikey');
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "rounds/addGoal",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(data),
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


