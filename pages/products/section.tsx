import React from "react";
import Link from 'next/link';

import NumberFormat from 'react-number-format';
/* type modalprops = {
    product?:{
        id:null,
        name:'',
        image:'',
        des:'',
        price:0,
        discount:null,
        inventory:0
    }
} */
   
const Productcontent:React.FC<any> = (props) => {
    const onaddTocart = (product) =>{
         props.onAddToCart(product); 
    }
  
    return (
        <>      
            <div className="product-content-body">
                <div className="product-content">
                    <div className="product-img-content">
                         <img src={props.product.image} alt={props.product.image}/> 
               
                        <div className="product-detail-link">
                            <div className="product-detail-link-hover">
                            <Link 
                            href={`/container/${props.product.id}`}><a>QUICK VIEW</a></Link>
                            </div>
                        </div>
                    </div>
                    <div className="product-name_price-content">
                        <h5>{props.product.name}</h5>
                        <div className="product_price">
                            <p className="text-dark">                         
                            <NumberFormat value={props.product.price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            </p>
                            <p className="text-discount">                              
                                <NumberFormat value={props.product.discount !== null ? props.product.discount : ''} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                            </p>
                        </div>
                    </div>
                    <div className="product-action-content">
                    <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Add Cart" onClick={() => onaddTocart(props.product)} ><i className="fas fa-cart-plus icon-cart"></i></button>
      
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Productcontent;