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
  const failesImgg =
    'data:image/png;base64,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';
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
                                <Image
                                  src={product.images[0] ? product.images[0].imgUrl : ''}
                                  fallback={failesImgg}
                                ></Image>
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
                                <Image
                                  src={product.images[0] ? product.images[0].imgUrl : ''}
                                  fallback={failesImgg}
                                ></Image>
                              </div>
                            </Link>
                          </div>
                          <div className={styles.describer}>
                            <span className={styles.productPrice}>
                              <a>
                                <span className={styles.price}>
                                  {product.productDetails[0]
                                    ? VNDFormaterFunc(product.productDetails[0].retailPrice)
                                    : ''}
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
