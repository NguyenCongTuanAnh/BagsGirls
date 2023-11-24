import React, { useState, useEffect } from 'react';
import styles from './ListCheckOut.module.scss';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { Input } from 'antd';
import { Form } from 'react-router-dom';
function ListCheckOut() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.retailPrice;
    }, 0);
  };

  return (
    <div className={styles.list_product}>
      <div className={styles.titleĐonHang}>
        <h1>Đơn hàng</h1>
      </div>
      <br></br>

      {cartItems.map((item, index) => (
        <div className={styles.item} key={index}>
          {/* Render each item as needed */}
          <div className={styles.avatar}>
            <img src={item.image} className={styles.image} alt={item.productName} />
            <div className={styles.info}>
              <div className={styles.productTitle}>{item.productName}</div>
              <div className={styles.titleChild}>
                <i>{`Color: ${item.colorName}`}</i>
                <br />
                <i> {`Material: ${item.materialName}`}</i>
              </div>
              <div className={styles.number}>{`Quantity: ${item.quantity}`}</div>
              <span className={styles.price_sale}>
                Price:{' '}
                <ins>
                  <span className={styles.price}>{VNDFormaterFunc(item.retailPrice)}</span>
                </ins>
              </span>
            </div>
          </div>
        </div>
      ))}
      <hr></hr>
      <div>
        <h3>
          Tổng tiền: <span style={{ color: 'red' }}> {VNDFormaterFunc(calculateTotal())}</span>
        </h3>
      </div>

      <hr></hr>
      <div className={styles.voucher}>
        <h4>Voucher:</h4>
      </div>

      <hr></hr>
      <form className={styles.pay}>
        <h3>Phương thức thanh toán:</h3>
        <Input name="thanhtoan" type="radio" value="Thanh toán khi nhận hàng" />
        <Input name="thanhtoan" type="radio" value="credit_card" />
        <Input name="thanhtoan" type="radio" value="bank_transfer" />
      </form>

      <hr></hr>

      <div className={styles.totalCheckout}>
        <br></br>
        <h4>
          Tổng thanh toán: <span style={{ color: 'red' }}> {VNDFormaterFunc(calculateTotal())}</span>
        </h4>
        <br></br>
      </div>
      <br></br>

      <button className={styles.checkOut}>Thanh toán</button>
    </div>
  );
}

export default ListCheckOut;
