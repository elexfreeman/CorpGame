import moment from 'moment';


// для даты
export function datePipe(date) {

    let month = moment(date).format('MM');
    let resp = '';
    switch (month) {
        case '01':
            resp = moment(date).format('DD') + ' января';
            break;

        case '02':
            resp = moment(date).format('DD') + ' февраля';
            break;

        case '03':
            resp = moment(date).format('DD') + ' марта';
            break;

        case '04':
            resp = moment(date).format('DD') + ' апреля';
            break;

        case '05':
            resp = moment(date).format('DD') + ' мая';
            break;

        case '06':
            resp = moment(date).format('DD') + ' июня';
            break;

        case '07':
            resp = moment(date).format('DD') + ' июля';
            break;


        case '08':
            resp = moment(date).format('DD') + ' августа';
            break;


        case '09':
            resp = moment(date).format('DD') + ' сентября';
            break;


        case '10':
            resp = moment(date).format('DD') + ' октября';
            break;


        case '11':
            resp = moment(date).format('DD') + ' ноября';
            break;


        case '12':
            resp = moment(date).format('DD') + ' декабря';
            break;
    }

    return resp;
}


// для даты
export function dateTimePipe(date) {

    let month = moment(date).format('MM');
    let resp = '';
    switch (month) {
        case '01':
            resp = moment(date).format('DD') + ' января';
            break;

        case '02':
            resp = moment(date).format('DD') + ' февраля';
            break;

        case '03':
            resp = moment(date).format('DD') + ' марта';
            break;

        case '04':
            resp = moment(date).format('DD') + ' апреля';
            break;

        case '05':
            resp = moment(date).format('DD') + ' мая';
            break;

        case '06':
            resp = moment(date).format('DD') + ' июня';
            break;

        case '07':
            resp = moment(date).format('DD') + ' июля';
            break;


        case '08':
            resp = moment(date).format('DD') + ' августа';
            break;


        case '09':
            resp = moment(date).format('DD') + ' сентября';
            break;


        case '10':
            resp = moment(date).format('DD') + ' октября';
            break;


        case '11':
            resp = moment(date).format('DD') + ' ноября';
            break;


        case '12':
            resp = moment(date).format('DD') + ' декабря';
            break;
    }

    return resp + ' ' + moment(date).format('YYYY HH:mm');
}






// для даты
export function mysqlDatePipe(input_date) {
    var d = moment(input_date);
    var tmp = d.format("DD.MM.YYYY");
    if(tmp=='Invalid date') tmp = '';
    return tmp;
}