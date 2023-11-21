import { Badge, Carousel } from 'antd';
import { Link } from 'react-router-dom';

import styles from '../MainHeader/index.module.scss';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

function MainHeader() {
  const [cartCount, setCartCount] = useState(0); // Default value set to 0

  useEffect(() => {
    // Retrieve cart count from local storage or API
    const storedCart = localStorage.getItem('temporaryCart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    const totalCount = parsedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);
  return (
    <div className="container-fluid" style={{ height: '100px' }}>
      <div className={styles.mainHeader}>
        <Link to={'/'}>
          <img className={styles.image} alt="img" src="https://i.imgur.com/e1Tfbn5.png"></img>
        </Link>
        <div className={styles.content}>
          <div className={styles.toolLeft}></div>
          <div className={styles.search}>
            <div className={styles.searchForm}>
              <form className={styles.form}>
                <SearchOutlined className={styles.icon} />
                <input className={styles.searchInput} placeholder="Tìm kiếm sản phẩm"></input>
              </form>
            </div>
          </div>
          <div className={styles.toolRight}>
            <div className={styles.profile}>
              <div className={styles.login}>
                <ul className={styles.horizontalLogin}>
                  <li>
                    <Link to={'/login'}>ĐĂNG NHẬP</Link>
                  </li>
                  <span> / </span>
                  <li>
                    <Link to={'/login'}>ĐĂNG KÝ</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.cart}>
              <Link to="/cart">
                <Badge className={styles.cartBadge} count={cartCount}>
                  <ShoppingCartOutlined className={styles.cartIcon} />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
