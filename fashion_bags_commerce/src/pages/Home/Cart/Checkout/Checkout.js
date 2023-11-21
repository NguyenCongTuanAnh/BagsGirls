import React, { useState } from 'react';
import Header from '../../Header';
import AddressVietnam from '~/api/addressVietNam/apiAddress';

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
          <h1>Địa chỉ</h1>
          <AddressVietnam />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
