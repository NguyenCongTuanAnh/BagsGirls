import { Table, Image, Button } from 'antd';
import { useEffect, useState } from 'react';
import styles from './tableCart.module.scss';
import vndFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { DeleteFilled, DeleteOutlined, DoubleRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Tab } from 'bootstrap';

function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((totalQty, item) => {
      return totalQty + item.quantity;
    }, 0);
    setTotalQuantity(total);
  }, [cartItems]);

  useEffect(() => {
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.retailPrice;
    }, 0);
  };

  const handleRemoveItem = (record) => {
    const updatedCart = cartItems.filter((item) => item !== record);
    setCartItems(updatedCart);
    localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <Image style={{ width: '200px', height: '200px' }} src={record.image} alt={record.productName} />
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      render: (texe, record) => (
        <div className={styles.info_item}>
          <div className={styles.title_product}>
            {' '}
            {record.productName}-{record.productCode}
          </div>
          <ul className={styles.attr}>
            <li>
              {' '}
              <span className={styles.spanTitle}>Màu sắc: </span> {record.colorName}
            </li>

            <li>
              <span className={styles.spanTitle}>Chất liệu: </span>
              {record.materialName}
            </li>
          </ul>
        </div>
      ),
      key: 'productName',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (text, record) => (
        <div className={' title_attr'}>
          <div className={styles.book_number}>
            <div className={styles.item_change1} onClick={() => handleDecrement(record)}>
              <MinusOutlined />
            </div>
            <input
              disabled
              className={styles.input_amount}
              value={record.quantity}
              id="quantity"
              onChange={(e) => handleQuantityChange(e, record)}
              min={1}
            />
            <div className={styles.item_change2} onClick={() => handleIncrement(record)}>
              <PlusOutlined />
            </div>
          </div>
        </div>
      ),
      key: 'quantity',
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'retailPrice',
      render: (text, record) => vndFormaterFunc(record.retailPrice),
      key: 'retailPrice',
    },
    {
      title: 'Thành tiền',
      render: (text, record) => vndFormaterFunc(record.quantity * record.retailPrice),
      key: 'calculateTotal',
    },
    {
      title: 'Xóa',
      dataIndex: 'operation',
      render: (text, record) => (
        <Button type="link" danger onClick={() => handleRemoveItem(record)}>
          <DeleteFilled />
        </Button>
      ),
      key: 'operation',
    },
  ];

  const handleQuantityChange = (e, record) => {
    const updatedCart = cartItems.map((item) => {
      if (item === record) {
        return { ...item, quantity: parseInt(e.target.value, 10) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));
  };

  const handleIncrement = (record) => {
    const amountInDatabase = record.amountInDatabase; // Số lượng tồn kho của sản phẩm trong cơ sở dữ liệu

    if (record.quantity + 1 > amountInDatabase) {
      // Hiển thị thông báo khi số lượng vượt quá số lượng trong kho
      alert('Số lượng vượt quá số lượng trong kho!');
    } else {
      const updatedCart = cartItems.map((item) => {
        if (item === record) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCartItems(updatedCart);
      localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));
    }
  };

  const handleDecrement = (record) => {
    if (record.quantity > 1) {
      const updatedCart = cartItems.map((item) => {
        if (item === record) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
      localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));
    }
  };
  return (
    <div className="container-fluid" style={{ padding: '0 5% 0 5%' }}>
      <div>
          <Link to={'/shop'} className={styles.continue_cart}>
            Tiếp tục mua sắm <DoubleRightOutlined />
          </Link>
        <Table
          bordered
          style={{ textAlign: 'center' }}
          className={styles.table_cart_item}
          dataSource={cartItems}
          columns={columns}
          rowKey="productName"
          footer={() => (
            <div>
              <h3>
                Tổng tiền: <span style={{ color: 'red' }}> {vndFormaterFunc(calculateTotal())}</span>
              </h3>
            </div>
          )}
        />
      </div>
      {/* tien hanh thanh toan */}
      <div className={styles.finalCart}>
        <br></br>
        <div className={styles.content_product_pc}>
          <div className={styles.group_content_product}>
            <div className={styles.body}>
              <div className={styles.body_ct}>
                <ul className="list-oppr">
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Số lượng: </span>
                    <span className={styles.labelName}>
                      <span style={{ color: 'red', fontSize: '30px' }}>{totalQuantity} </span>Sản phẩm
                    </span>
                  </li>
                  <hr></hr>
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Giá trị hàng hóa: </span>
                    <span className={styles.labelName}>{vndFormaterFunc(calculateTotal())}</span>
                  </li>
                  <hr></hr>
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Phí vận chuyển: </span>
                    <span className={styles.labelName}>chưa có</span>
                  </li>
                  <hr></hr>
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Giảm tiền: </span>
                    <span className={styles.labelName}>chưa có</span>
                  </li>{' '}
                  <hr></hr>
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Thành tiền: </span>
                    <span className={styles.labelName} style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
                      {vndFormaterFunc(calculateTotal())}
                    </span>
                  </li>{' '}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Link to={'/cart/checkout'}>
          <br></br>
          <button className={styles.buttonThanhToan}>Tiến hành thanh toán</button>
        </Link>
      </div>
      <br></br>
    </div>
  );
}

export default CartItem;