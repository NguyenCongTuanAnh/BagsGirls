import { Layout } from 'antd';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './cart.module.scss';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/cartItem';
import { Fragment, useEffect, useState } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import MainLayout from '../MainLayout';

function CartView() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
    <h1 className={styles.titleCart}>Giỏ hàng</h1>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="https://theme.hstatic.net/1000197303/1001046599/14/empty-cart-desktop.png?v=7097"
                    style={{ width: '25%', height: '25%' }}
                  ></img>
    
                  <h3 style={{ color: 'gray', margin: '50px 0 0 0' }}>Bạn chưa có sản phẩm nào trong giỏ hàng.. </h3>
                  <Link to={'/shop'} className={styles.continue_cart}>
                    <span>
                      Tiếp tục mua sắm <DoubleRightOutlined />
                    </span>
                  </Link>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <CartItem />
                </div>
              )}
    </MainLayout>
  );
}

export default CartView;
