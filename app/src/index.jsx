import React from 'react';
import {render} from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import App from "./App";

// Корзина
/*загружаем ее*/
//store.dispatch(onGetCart());


let cart_container = document.getElementById('app');
console.log(cart_container);
render(

        <BrowserRouter>
            <App/>
        </BrowserRouter>

    , cart_container);

