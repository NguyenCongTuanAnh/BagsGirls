import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cartAPI from '~/api/cartAPI';
import fullProductAPI from '~/api/client/fullProductAPI';

import styles from '../MainHeader/index.module.scss';
import UserProfile from './UserProfile';

function MainHeader() {
  const [cartCount, setCartCount] = useState(0); // Mặc định là 0
  const [cartCountInDb, setCartCountInDb] = useState(0); // Mặc định là 0
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Đặt mặc định là false khi chưa đăng nhập
  const [customerId, setCustomerId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [messageApi, contextHolder] = message.useMessage();

  const customer = localStorage.getItem("customerId");
  useEffect(() => {
    // Lấy số lượng sản phẩm trong giỏ hàng từ local storage hoặc API
    const storedCart = localStorage.getItem('temporaryCart');
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    const totalCount = parsedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
    setCartCountInDb(0)

    const customerTokenString = localStorage.getItem('customerDecodeString');
    if (customerTokenString) {
      setIsLoggedIn(true);
    }
  }, []);

  const changeLoggedIn = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('customerDecodeString');
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerToken');
    localStorage.removeItem('temporaryCart');
    navigate('/');
    messageApi.open({
      type: 'success',
      content: 'Đăng xuất thành công',
    });
  };

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
      // event.preventDefault();
      handleSearch();
      if (location?.pathname !== '/search') {
        console.log('111111111111111');
        navigate('/search', {
          state: {
            keyword: searchKeyword,
          },
        });
      }
    }
  };
  const createCartForCustomer = async (customerId) => {
    try {
      const response = await cartAPI.save({ customerId });
      console.log('Created cart for the customer:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw new Error('Failed to create cart');
    }
  };

  const handleLogin = async () => {
    try {
      const loggedInCustomerId = localStorage.getItem('customerId');

      if (loggedInCustomerId) {
        setCustomerId(loggedInCustomerId);
        await createCartForCustomer(loggedInCustomerId);
        setIsLoggedIn(true);
      } else {
        // Handle the case when customerId is not available
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error as needed
    }
  };
  return (
    <div style={{ height: '100px' }}>
      {contextHolder}
      <div className={styles.mainHeader}>
        <Link to={'/'}>
          <img
            className={styles.image}
            alt="img"
            src="https://firebasestorage.googleapis.com/v0/b/bagsgirl-datn.appspot.com/o/Image%2Flogo.png?alt=media&token=5eac10cf-5998-459a-90ab-9ae86c0c631e"
          ></img>
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
                  <UserProfile changeLoggedIn={changeLoggedIn} />
                </div>
              ) : (
                <div className={styles.login}>
                  <ul className={styles.horizontalLogin}>
                    <li>
                      <Link to={'/login'} onClick={() => handleLogin(customerId)}>
                        ĐĂNG NHẬP
                      </Link>
                    </li>
                    <span> / </span>
                    <li>
                      <Link to={'/signup'}>ĐĂNG KÝ</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.cart}>
              {customer === null ? (
                <Link to="/cart">
                  <Badge className={styles.cartBadge} count={cartCount}>
                    <ShoppingCartOutlined className={styles.cartIcon} />
                  </Badge>
                </Link>
              ) : (
                <Link to={`/cart/${customer}`}>
                  <Badge className={styles.cartBadge} count={cartCountInDb}>
                    <ShoppingCartOutlined className={styles.cartIcon} />
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
// import { Badge, message, notification } from 'antd';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
// import { useEffect, useState } from 'react';
// import cartAPI from '~/api/cartAPI';
// import fullProductAPI from '~/api/client/fullProductAPI';

// import styles from '../MainHeader/index.module.scss';
// import UserProfile from './UserProfile';
// import { getCustomer, getCustomerIdUser } from '~/api/auth/helper/UserCurrent';

// function MainHeader() {
//   const [cartCount, setCartCount] = useState(0); // Mặc định là 0
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Đặt mặc định là false khi chưa đăng nhập
//   const [customerId, setCustomerId] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [messageApi, contextHolder] = message.useMessage();

//   const customer = localStorage.getItem("customerId")
//   useEffect(() => {
//     // Lấy số lượng sản phẩm trong giỏ hàng từ local storage hoặc API
//     const storedCart = localStorage.getItem('temporaryCart');
//     const parsedCart = storedCart ? JSON.parse(storedCart) : [];
//     const totalCount = parsedCart.reduce((acc, item) => acc + item.quantity, 0);
//     setCartCount(totalCount);

//     const customerTokenString = localStorage.getItem('customerDecodeString');
//     if (customerTokenString) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const changeLoggedIn = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('customerDecodeString');
//     localStorage.removeItem('customerId');
//     localStorage.removeItem('customerToken');
//     localStorage.removeItem('temporaryCart');
//     navigate('/');
//     messageApi.open({
//       type: 'success',
//       content: 'Đăng xuất thành công',
//     });
//   };

//   const handleSearch = () => {
//     fullProductAPI
//       .searchByKeyword(searchKeyword)
//       .then((response) => {
//         console.log('Data from API:', response.data);
//         // Xử lý dữ liệu và cập nhật state hoặc hiển thị dữ liệu ở đây
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const handleInputChange = (event) => {
//     setSearchKeyword(event.target.value);
//   };

//   const handleEnterKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       // event.preventDefault();
//       handleSearch();
//       if (location?.pathname !== '/search') {
//         console.log('111111111111111');
//         navigate('/search', {
//           state: {
//             keyword: searchKeyword,
//           },
//         });
//       }
//     }
//   };
//   const createCartForCustomer = async (customerId) => {
//     try {
//       const response = await cartAPI.save({ customerId });
//       console.log('Created cart for the customer:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating cart:', error);
//       throw new Error('Failed to create cart');
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const loggedInCustomerId = localStorage.getItem('customerId');

//       if (loggedInCustomerId) {
//         setCustomerId(loggedInCustomerId);
//         await createCartForCustomer(loggedInCustomerId);
//         setIsLoggedIn(true);
//       } else {
//         // Handle the case when customerId is not available
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       // Handle the error as needed
//     }
//   };
//   return (
//     <div style={{ height: '100px' }}>
//       {contextHolder}
//       <div className={styles.mainHeader}>
//         <Link to={'/'}>
//           <img
//             className={styles.image}
//             alt="img"
//             src="https://firebasestorage.googleapis.com/v0/b/bagsgirl-datn.appspot.com/o/Image%2Flogo.png?alt=media&token=5eac10cf-5998-459a-90ab-9ae86c0c631e"
//           ></img>
//         </Link>
//         <div className={styles.content}>
//           <div className={styles.toolLeft}></div>
//           <div className={styles.search}>
//             <div className={styles.searchForm}>
//               <form className={styles.form}>
//                 <SearchOutlined className={styles.icon} />
//                 <input
//                   className={styles.searchInput}
//                   placeholder="Tìm kiếm sản phẩm"
//                   value={searchKeyword}
//                   onChange={handleInputChange}
//                   onKeyDown={handleEnterKeyPress}
//                 />
//               </form>
//             </div>
//           </div>
//           <div className={styles.toolRight}>
//             <div className={styles.profile}>
//               {isLoggedIn ? (
//                 <div style={{ paddingTop: '20px' }}>
//                   {' '}
//                   <UserProfile changeLoggedIn={changeLoggedIn} />
//                 </div>
//               ) : (
//                 <div className={styles.login}>
//                   <ul className={styles.horizontalLogin}>
//                     <li>
//                       <Link to={'/login'} onClick={() => handleLogin(customerId)}>
//                         ĐĂNG NHẬP
//                       </Link>
//                     </li>
//                     <span> / </span>
//                     <li>
//                       <Link to={'/signup'}>ĐĂNG KÝ</Link>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <div className={styles.cart}>
//               {customer == null ? (
//                 <Link to="/cart">
//                   <Badge className={styles.cartBadge} count={cartCount}>
//                     <ShoppingCartOutlined className={styles.cartIcon} />
//                   </Badge>
//                 </Link>
//               ) : (
//                 <Link to={`/cart/${customer}`}>
//                   <Badge className={styles.cartBadge} count={cartCount}>
//                     <ShoppingCartOutlined className={styles.cartIcon} />
//                   </Badge>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainHeader;
