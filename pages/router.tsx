import React from "react";

import ProductPage from "./mainpage/products/product";
import DetailPage from "./mainpage/details/detail";
import CartPage from "./mainpage/cart/cart";

import { JsxEmit } from "typescript";

const routers = [
    
    {
        path:'/product',
        exact :true,
        main: () => {<ProductPage />}
    },
    {
        path:'/detail',
        exact :true,
        main: () => {<DetailPage />}
    },
    {
        path:'/cart',
        exact :true,
        main: () => {<CartPage />}
    },
];
export default routers;