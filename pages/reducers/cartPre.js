import * as types from "../constant/actionType";
import React,{useState,useEffect} from "react";
var data = null;
/* data=JSON.parse(localStorage.getItem('CART')); */
if(typeof window !== 'undefined'){
     data = JSON.parse(localStorage.getItem('CART'));//get data from localStorage
}
var initialSate = data ? data : [];
const cartPre = (state = initialSate, action) => {
   var {product,quantity,id,detail} = action;
   var index = -1;
    switch (action.type) {//compare action-type got from reducer 
           case types.ADD_TO_CART:
               index = findIdProInCart(state,product.id);
               if(index !== -1)
               {
                   state[index].quantity += quantity;
               }
               else{
                state.push({
                    product,
                    quantity
                })
               }        
               localStorage.setItem('CART',JSON.stringify(state));
               return [...state];
            case types.DElETE_IN_CART:
               index = findIdProInCart(state,id);
               if(index !== -1){
                   state.splice(index,1);
               }
               localStorage.setItem('CART',JSON.stringify(state));
                return [...state];
            case types.UPDATE_AMOUNT_CART:
                index = findIdProInCart(state,id);
                
                if(index !== -1){
                    state[index].quantity = quantity
                }
                
                localStorage.setItem('CART',JSON.stringify(state));
                return [...state] 
            case types.DElETE_ALL_CART:
                for(var i=0 ; i < state.length ; i++)
                {
                    state.length=[];
                }
                localStorage.setItem('CART',JSON.stringify(state));
                return [...state]
            case types.ADD_DETAIL_TO_CART:
               
                 index = findIdProInCart(state,product.id);
               if(index !== -1)
               {
                   state[index].quantity += quantity;
               }
               else{
                state.push({
                    product,
                    quantity
                })
               }        
               localStorage.setItem('CART',JSON.stringify(state)); 
               return [...state];
        default: return [...state]; //contain all product when render  
    }
    
}
var findIdProInCart = (cart,id) =>{ 
    var index = -1;
    if(cart.length > 0)
    {
        for(var i=0 ;i<cart.length ;i++)
        {
            if(cart[i].product.id === id)
            {
                index = i;
                break;
            }
        }   
    }
    return index;
}

export default cartPre;