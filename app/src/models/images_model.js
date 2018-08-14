import {rest_server} from './settings';

/*отправляеет афишу о системе*/
export function getImgUrl(photoUrl) {

    if (photoUrl) {
        /*разбираем путь*/
        let filename = photoUrl.substring(photoUrl.lastIndexOf('/') + 1);
        let path = photoUrl.substring(0, photoUrl.lastIndexOf("/"));

        return rest_server + path + '/bergth_600x600/' + filename;

    } else return '';

}


export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}