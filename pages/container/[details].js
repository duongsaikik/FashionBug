import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Detail from "../products/detail/detail";
import * as Config from "../constant/config";
import {actFetchDetailProduct,actAddDetailToCart } from '../actions';
const DetailCon = (props) => {
    const router = useRouter();
    const [data,setData] = useState(null);
    
    const {details} = router.query;
    useEffect(() => {
        if (router.asPath !== router.route) {
            const fetchh = async () => {

                const res = await fetch(`https://613086f18066ca0017fda92b.mockapi.io/api/students/${details}`);
                const data= await res.json();     
              setData(data);
              props.actFetchDetailProduct(data)
            };
           fetchh();
        }
      }, [router])
   

     
    const {actAddDetailToCart} = props;
    return (
        <>
          <Detail detail={props.detail} actAddDetailToCart={actAddDetailToCart} />
        </>
    )
}
const mapStateToProps = state => {
  
    return {
      
        detail: state.detail//get product from store in reducer and push in props
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return {  
       
        actFetchDetailProduct:(detail) =>{ 
            dispatch(actFetchDetailProduct(detail)); //add cart with action "actAddtoCart" through dispatch
        },
        actAddDetailToCart:(product,quantity) =>{ 
           
                dispatch(actAddDetailToCart(product,quantity)); //add cart with action "actAddtoCart" through dispatch
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DetailCon);