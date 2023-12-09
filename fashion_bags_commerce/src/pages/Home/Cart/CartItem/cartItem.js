import { Table, Image, Button, notification, message, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import styles from './tableCart.module.scss';
import vndFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { DeleteFilled, DeleteOutlined, DoubleRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Tab } from 'bootstrap';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import voucherAPI from '~/api/voucherAPI';
import moment from 'moment/moment';
import Search from 'antd/es/input/Search';

function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucher, setVoucher] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucherPrice, setVoucherPrice] = useState(0);
  const [disCountPercent, setDiscountPercent] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleApplyVoucherCode = async () => {
    console.log(voucherCode);
    if (voucherCode === '') {
      messageApi.error('Mã code không hợp lệ!!!!');
      return;
    }
    try {
      const response = await voucherAPI.findByVoucherCode(voucherCode);
      const voucher = response.data;
      console.log('voucherss', voucher);
      setVoucher(voucher);
      if (voucher.voucherAmount <= 0) {
        messageApi.open({
          type: 'error',
          content: 'Voucher đã được áp dụng hết!!!!',
        });
      } else {
        const currentTime = moment();
        const startTime = moment(voucher.voucherStartTime);
        const endTime = moment(voucher.voucherEndTime);

        if (currentTime.isBetween(startTime, endTime)) {
          console.log(currentTime.isBetween(startTime, endTime));
          console.log('gia toi thieu', voucher.totalPriceToReceive);
          console.log('tong gia bill', calculateTotal());

          if (voucher.totalPriceToReceive <= calculateTotal()) {
            setDiscountPercent(voucher.discountPercent);
            const calculatedVoucherPrice = calculateTotal() * (voucher.discountPercent / 100) || voucherPrice;
            setVoucherPrice(calculatedVoucherPrice);
            const discountedTotalPrice = calculateTotal() - calculatedVoucherPrice;
            setTotalPrice(discountedTotalPrice);
            console.log('tong bill khi ap dung voucher', discountedTotalPrice);

            messageApi.open({
              type: 'success',
              content: `Voucher áp dụng thành công!!!!`,
            });
          } else {
            messageApi.open({
              type: 'error',
              content: 'Đơn hàng không đủ điều kiên để áp dụng voucher',
            });
          }
        } else {
          messageApi.open({
            type: 'error',
            content: 'Voucher đã hết hạn!',
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        messageApi.open({
          type: 'error',
          content: 'Mã Voucher này không tồn tại!!!',
        });
      }
    }
  };

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

  const calculateTotalAfterVoucher = () => {
    const totalBeforeVoucher = calculateTotal();
    return vndFormaterFunc(totalBeforeVoucher - voucherPrice);
  };

  const handleRemoveItem = (record) => {
    const updatedCart = cartItems.filter((item) => item !== record);
    setCartItems(updatedCart);
    localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));

    if (updatedCart.length === 0) {
      window.location.reload();
    }
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
    // {
    //   title: 'id',
    //   dataIndex: 'productDetailId',
    //   key: 'productDetailId',
    // },
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
        <Button type="dashed" danger onClick={() => handleRemoveItem(record)} icon={<DeleteOutlined />}>
          Xóa
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
    const amountInDatabase = record.amount;
    console.log('so luong sp trong kho', amountInDatabase); // Số lượng tồn kho của sản phẩm trong cơ sở dữ liệu

    if (record.quantity + 1 > amountInDatabase) {
      // Hiển thị thông báo khi số lượng vượt quá số lượng trong kho
      notification.error({
        message: 'Thất bại',
        description: 'Số lượng đã đạt giới hạn ',
        duration: 1,
      });
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
    <div className="" style={{ padding: '0 5% 0 5%' }}>
      {contextHolder}
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
                <span>
                  Tổng tiền: <span style={{ color: 'red' }}> {VNDFormaterFunc(calculateTotal())}</span>
                </span>
              </h3>
            </div>
          )}
        />
      </div>
      {/* tien hanh thanh toan */}
      <div className={styles.finalCart}>
        <br />
        <div className={styles.content_product_pc}>
          <div className={styles.group_content_product}>
            <div className={styles.body}>
              <div className={styles.body_ct}>
                <ul className="list-oppr">
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Số lượng: </span>
                    <span className={styles.labelName}>
                      <span style={{ color: 'red', fontSize: '30px' }}>{totalQuantity}</span> Sản phẩm
                    </span>
                  </li>
                  <hr />
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Giá trị hàng hóa: </span>
                    <span className={styles.labelName}>{vndFormaterFunc(calculateTotal())}</span>
                  </li>
                  <hr />
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Mã giảm giá: </span>
                    <Form layout="vertical">
                      <Form.Item>
                        <Search
                          onChange={(e) => {
                            setVoucherCode(e.target.value);
                          }}
                          enterButton="Áp dụng"
                          onSearch={handleApplyVoucherCode}
                          value={voucherCode}
                          placeholder="(Nếu có)"
                        />
                      </Form.Item>
                    </Form>
                  </li>
                  <hr />
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Giảm tiền: </span>
                    <span className={styles.labelName}>
                      <div className={styles.item}>
                        <h6>- {VNDFormaterFunc(voucherPrice)}</h6>
                      </div>
                    </span>
                  </li>
                  <hr />
                  <li className={styles.productDetailItem}>
                    <span className={styles.label}>Thành tiền: </span>
                    <span className={styles.labelName} style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
                      {calculateTotalAfterVoucher()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <br />
        <button
          className={styles.buttonThanhToan}
          onClick={() => {
            navigate('/cart/checkout', { state: { totalPrice: calculateTotalAfterVoucher() } });
          }}
        >
          Tiến hành thanh toán
        </button>
      </div>

      <br></br>
    </div>
  );
}

export default CartItem;
