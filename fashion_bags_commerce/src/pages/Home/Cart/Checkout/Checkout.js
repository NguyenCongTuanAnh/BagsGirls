import React, { useState } from 'react';
import Header from '../../Header';
import styles from './checkout.module.scss';
import CheckoutDetail from '~/pages/Home/Cart/Checkout/FormCheckoutDetail/CheckoutDetail';
function Checkout() {


  return (
    <div className="checkout">
      <Header />
      <br></br>
      <div>
        <div className="page_content">
            <CheckoutDetail />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
