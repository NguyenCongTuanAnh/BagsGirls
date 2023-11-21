import React, { useState } from 'react';
import Header from '../../Header';
import AddressVietnam from '~/pages/Home/Cart/Checkout/AddressCustomer/AddressCustomer';
import styles from './checkout.module.scss';
import CartItem from '../CartItem/cartItem';
import ListCheckOut from './ListProductCheckout/ListProductCheckout';
function Checkout() {
  const [loginType, setLoginType] = useState(1); // Default login type

  const handleLoginTypeChange = (event) => {
    setLoginType(parseInt(event.target.value)); // Parse the value to integer
  };

  const handleSubmit = () => {
    // Handle form submission logic
    // Access form data using state variables or useRef
    // Implement logic for login based on the selected loginType
  };

  return (
    <div className="checkout">
      <Header />
      <br></br>
      <div>
        <div className="page_content">
          <div className={styles.contentCheckOut}>
            <AddressVietnam />
            <ListCheckOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
