import { Layout } from 'antd';
import Footer from '../Footer/index';
import Header from '../Header/index';
import ShopView from './ShopView/index';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import AddressVietnam from '~/pages/Home/Cart/Checkout/AddressCustomer/AddressCustomer';
import CartItem from '../Cart/CartItem/cartItem';

function Shop() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    <Fragment>
      <body>
        <div className="fullpage">
          <div className="header001">
            <Header />
          </div>
          <div className="page_content">
            <ShopView />
          </div>
          <div className="footer_client">
            <Footer />
          </div>
        </div>
      </body>
    </Fragment>
  );
}

export default Shop;
