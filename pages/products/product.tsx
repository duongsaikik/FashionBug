
import React, { useState, useEffect } from 'react';


import Option from './options';

const Product:React.FC<any> = ({children}) => {
  return (
    <>
      <div className="body">
        <div className="containerr">
          <div className="body-container">
            <div className="body-nav" id="body-nav">
              <div className="left-content">
               <Option />
              </div>
            </div>
            <div className="section-body">    
              <section>
               {children}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product;