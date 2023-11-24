import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import fullProductAPI from '~/api/client/fullProductAPI';

import styles from '../MainHeader/index.module.scss';
import PopupProfile from '~/component/GlobalStyles/layouts/DefaultLayout/Header/PopupProfile';
import UserProfile from './UserProfile';

function MainHeader() {
  const [cartCount, setCartCount] = useState(0); // Mặc định là 0
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Đặt mặc định là false khi chưa đăng nhập

  useEffect(() => {
    // Lấy số lượng sản phẩm trong giỏ hàng từ local storage hoặc API
    const storedCart = localStorage.getItem('temporaryCart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    const totalCount = parsedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);

    const userToken = localStorage.getItem('customerTokenString');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    fullProductAPI
      .searchByKeyword(searchKeyword)
      .then((response) => {
        console.log('Data from API:', response.data);
        // Xử lý dữ liệu và cập nhật state hoặc hiển thị dữ liệu ở đây
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

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
                <input
                  className={styles.searchInput}
                  placeholder="Tìm kiếm sản phẩm"
                  value={searchKeyword}
                  onChange={handleInputChange}
                  onKeyDown={handleEnterKeyPress}
                />
              </form>
            </div>
          </div>
          <div className={styles.toolRight}>
            <div className={styles.profile}>
              {isLoggedIn ? (
                <div style={{ paddingTop: '20px' }}>
                  {' '}
                  <UserProfile />
                </div>
              ) : (
                <div className={styles.login}>
                  <ul className={styles.horizontalLogin}>
                    <li>
                      <Link to={'/login'}>ĐĂNG NHẬP</Link>
                    </li>
                    <span> / </span>
                    <li>
                      <Link to={'/register'}>ĐĂNG KÝ</Link>
                    </li>
                  </ul>
                </div>
              )}
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
