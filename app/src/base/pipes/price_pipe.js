// для форматирования текста
export function pricePipe(input) {
    if(input==null) return '0';
    let price = Number.prototype.toFixed.call(parseFloat(input) || 0, 0);
    //заменяем точку на запятую
    let price_sep = price.replace(/(\D)/g, ",");
    //добавляем пробел как разделитель в целых
    price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    return  price_sep


}




