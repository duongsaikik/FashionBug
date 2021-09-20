import { combineReducers } from "redux";
import product from "./productPre";
/* import cartPre from "./cartPre"; */
import cart from "./cartPre";
import detail from "./detailRedu";
const appReducers = combineReducers({
    product,
    cart,
    detail,
});
export default appReducers;