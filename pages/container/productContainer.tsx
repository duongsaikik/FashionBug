
import React, { useState, useEffect } from 'react';
import Productcontent from '../products/section';
import { connect } from 'react-redux';
import Product from '../products/product';
import PropTypes from "prop-types";
import * as Config from "../constant/config";
import { actAddtoCart,actFetchProduct } from '../actions';
 

/* export const getStaticProps = async () => {
    const res = await fetch('https://613086f18066ca0017fda92b.mockapi.io/api/students')
    const data= await res.json()
  
    return {
      props: {
        data:data
      },
    }
  } */
const ProductContainer = (props) => { 
   //props contain attribute of product and  1 action to add to cart of each other 
  
    useEffect(() => {
        const fetchh = async () => {
            const res = await fetch(Config.API_URL);
            const data= await res.json()     
            props.actFetchProduct(data);
        };
       fetchh();
      
    },[]) 
 
    
    const showProduct = (product) =>{
        var result = null;
       const {onAddToCart} = props;
        if(product.length > 0)
        {         
          result = product.map((product,index) =>{
            return <Productcontent key={index} product={product} onAddToCart={onAddToCart}/>
          })
        }
        return result;
     } 
    return (
        <>          
            <Product>            
                    {showProduct(props.products)}                
            </Product>
        </>
    )
}
/* 
ProductContainer.propTypes = {
    products:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number.isRequired,
            name:PropTypes.string.isRequired,
            image:PropTypes.string.isRequired,
            description:PropTypes.string.isRequired,
            price:PropTypes.number.isRequired,
        
            inventory:PropTypes.number.isRequired,
            rating:PropTypes.number.isRequired
           
        })
    ).isRequired
} */

const mapStateToProps = state => {
  
    return {
      
        products: state.product//get product from store in reducer and push in props
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {  
        onAddToCart:(product) =>{ //product will get data from component "product" when user click add cart in component  "product"     
            dispatch(actAddtoCart(product,1)); //add cart with action "actAddtoCart" through dispatch
        },
        actFetchProduct:(product) =>{ 
            dispatch(actFetchProduct(product)); //add cart with action "actAddtoCart" through dispatch
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductContainer);
