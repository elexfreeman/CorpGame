// для форматирования текста
export function textPipe(text) {
    if(text==null) return '';

    text = text.replace(/\r\n|\r|\n/g, "<br />");
    let str = text.split('<br />');
    let txt_out = '';

    str.map((val, key) => {
        /*ежели это ссылка*/
        if (val.length > 4) {
            if (val.indexOf('http') + 1) {
                txt_out += '<a target="_blank" href="' + val + '">' + val + '</a> <br />';
            } else {
                txt_out += val + '<br /> ';
            }
        } else {
            txt_out += val + ' ';
        }
    });

    return txt_out;
}




