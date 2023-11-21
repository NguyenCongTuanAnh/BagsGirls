import React, { useState, useEffect } from 'react';
import styles from './ListCheckOut.module.scss';
function ListCheckOut() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className={styles.list_product}>
      {cartItems.map((item, index) => (
        <div className={styles.item} key={index}>
          {/* Render each item as needed */}
          <div className={styles.avatar}>
            <img src={item.image} className={styles.image} alt={item.productName} />
          </div>
          <div className={styles.info}>
            <div className={styles.productTitle}>{item.productName}</div>
            <div>
              <i>{`Color: ${item.colorName}, Material: ${item.materialName}`}</i>
            </div>
            <div className={styles.number}>{`Quantity: ${item.quantity}`}</div>
            <span className={styles.price_sale}>
              Price:{' '}
              <ins>
                <span className={styles.amount}>{item.retailPrice}</span>
              </ins>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListCheckOut;
