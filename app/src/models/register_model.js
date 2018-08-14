
import {rest_server} from './settings';
/*регистраиция юреа*/
export function register(user) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST", url: rest_server + "register/register",
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                resolve(data);
            },
            failure: function(errMsg) {
                reject(errMsg);
            }
        });
    });
}