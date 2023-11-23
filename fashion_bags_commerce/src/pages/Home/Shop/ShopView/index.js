import React, { Fragment, useEffect, useState } from 'react';
import { Image } from 'antd';
import fullProductAPI from '~/api/client/fullProductAPI';
import { FullscreenExitOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import styles from './index.module.scss';
import { Link, useLocation } from 'react-router-dom';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import BeatLoader from 'react-spinners/ClipLoader';
import queryString from 'query-string';
library.add(faShoppingCart);

function ShopView({ titleContent }) {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [columnType, setColumnType] = useState('col-3');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const searchKeyword = queryParams.keyword || '';

  const searchProducts = async (keyword) => {
    try {
      setLoadingProducts(true); // Bắt đầu tìm kiếm, hiển thị loading
      const response = await fullProductAPI.searchByKeyword(keyword);
      setSearchedProducts(response.data); // Lưu danh sách sản phẩm vào state searchedProducts
      setLoadingProducts(false); // Kết thúc tìm kiếm, ẩn loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadingProducts(false); // Xử lý lỗi, ẩn loading
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      // Thực hiện tìm kiếm khi có từ khóa
      searchProducts(searchKeyword);
    } else {
      // Nếu không có từ khóa, lấy tất cả sản phẩm
      // getAll();
    }
  }, [searchKeyword]);

  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);
    setTimeout(() => {
      getAll();
      setLoadingProducts(false);
    }, 500);
  }, []);

  const handleColumnChange = (type) => {
    setColumnType(type);
  };

  const getAll = async () => {
    try {
      const response = await fullProductAPI.getAll();
      const data = response.data;
      setData(data);
      // setLoadingProducts(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoadingProducts(false);
    }
  };

  return (
    <Fragment>
      <div>
        <h3 className={styles.sortTitle}>
          <button class={styles.line_col} onClick={() => handleColumnChange('col-4')}>
            <FullscreenOutlined />
          </button>
          SẢN PHẨM
          <button class={styles.line_col} onClick={() => handleColumnChange('col-3')}>
            <FullscreenExitOutlined />
          </button>
        </h3>

        <div className={styles.listSanPham}>
          {loadingProducts ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <BeatLoader color="#d64336" loading={true} size={50} />
              <p>Loading...</p>
            </div>
          ) : (
            <div className="row">
              <div className={styles.scrollableList}>
                {searchedProducts.length > 0
                  ? searchedProducts.map((product) => (
                      // Hiển thị sản phẩm từ kết quả tìm kiếm
                      <div key={product.productId} className={`${styles.scrollableList} ${columnType}`}>
                        <div className={styles.producItem}>
                          <div className={styles.productImage}>
                            <Link to={`/shop/detail/${product.productId}`}>
                              <div className={styles.contentImage}>
                                <Image src={product.images ? product.images[0].imgUrl : ''}></Image>
                              </div>
                            </Link>
                          </div>
                          <div className={styles.describer}>
                            <span className={styles.productPrice}>
                              <a>
                                <span className={styles.price}>
                                  {product.productDetails ? VNDFormaterFunc(product.productDetails[0].retailPrice) : ''}
                                </span>
                              </a>
                            </span>
                            <Link to={`/shop/detail/${product.productId}`}>
                              <div className={styles.productTitle}>
                                {product.productName}-{product.productCode}-{product.brand.brandName}{' '}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  : // Hiển thị danh sách sản phẩm ban đầu nếu không có kết quả tìm kiếm
                    data.map((product) => (
                      <div key={product.productId} className={`${styles.scrollableList} ${columnType}`}>
                        <div className={styles.producItem}>
                          <div className={styles.productImage}>
                            <Link to={`/shop/detail/${product.productId}`}>
                              <div className={styles.contentImage}>
                                <Image src={product.images ? product.images[0].imgUrl : ''}></Image>
                              </div>
                            </Link>
                          </div>
                          <div className={styles.describer}>
                            <span className={styles.productPrice}>
                              <a>
                                <span className={styles.price}>
                                  {product.productDetails ? VNDFormaterFunc(product.productDetails[0].retailPrice) : ''}
                                </span>
                              </a>
                            </span>
                            <Link to={`/shop/detail/${product.productId}`}>
                              <div className={styles.productTitle}>
                                {product.productName}-{product.productCode}-{product.brand.brandName}{' '}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ShopView;
