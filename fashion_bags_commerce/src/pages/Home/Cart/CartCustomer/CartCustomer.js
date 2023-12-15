import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cartAPI from '~/api/cartAPI';
import MainLayout from '../../MainLayout';
import cartDetailAPI from '~/api/cartDetailAPI';
import { DoubleRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './tableCart.module.scss';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { notification } from 'antd';

function CartCustomer() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');
  const [cartDetailId, setCartDetailId] = useState('');
  const [amountProductDetail, setAmountProductDetail] = useState(0);

  const { cartId: routeCartId } = useParams();
  const navigate = useNavigate();
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartAPI.findByIdCustomer(customerId);
        const data = response.data;
        setCartItems(data);
        setCartId(customerId);
        setAmountProductDetail(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchCart();
  }, [customerId]);
  console.log('cartDetail', cartItems);
  console.log('AmoutProduct', amountProductDetail);

  const handleDeleteCartItem = async (cartDetailId) => {
    console.log('cartDetalId', cartDetailId);
    try {
      await cartDetailAPI.delete(cartDetailId);
      // Sau khi xóa, cập nhật lại danh sách giỏ hàng bằng cách gọi lại API để lấy danh sách mới
      const response = await cartAPI.findByIdCustomer(customerId);
      const data = response.data;
      setCartItems(data);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (cartItems?.cartDetailsList) {
      cartItems.cartDetailsList.forEach((item) => {
        totalPrice += item.amount * item.productDetails.retailPrice;
      });
    }

    return totalPrice;
  };

  const handleQuantityChange = async (e, cartItem) => {
    const newQuantity = parseInt(e.target.value, 10);
    const updatedCartItem = { ...cartItem, amount: newQuantity };
    try {
      await cartDetailAPI.update(cartItem.cartDetailId, { amount: newQuantity });
      const updatedCartItems = cartItems.cartDetailsList.map((item) => {
        if (item.cartDetailId === cartItem.cartDetailId) {
          return updatedCartItem;
        }
        return item;
      });
      setCartItems({ ...cartItems, cartDetailsList: updatedCartItems });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleIncrement = async (cartItem) => {
    const newQuantity = cartItem.amount + 1;

    try {
      await updateCartItemQuantity(cartItem.cartDetailId, newQuantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleDecrement = async (cartItem) => {
    if (cartItem.amount > 1) {
      const newQuantity = cartItem.amount - 1;

      try {
        await updateCartItemQuantity(cartItem.cartDetailId, newQuantity);
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }
  };

  const updateCartItemQuantity = async (cartDetailId, newQuantity) => {
    try {
      await cartDetailAPI.updateAmount(cartDetailId, { amount: newQuantity });
      const response = await cartAPI.findByIdCustomer(customerId);
      const data = response.data;
      setCartItems(data);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <MainLayout>
      {' '}
      <div className="" style={{ padding: '0 5% 0 5%' }}>
        <h2 style={{ color: 'gray', textAlign: 'center' }}>Giỏ hàng của bạn</h2>
        <div style={{ textAlign: 'center' }}>
          <Link to={'/shop'} className={styles.continue_cart}>
            Tiếp tục mua sắm <DoubleRightOutlined />
          </Link>
        </div>
        <table
          style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse', margin: 'auto' }}
          className="table table-bordered"
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: 'white' }}>STT</th>
              <th style={{ backgroundColor: 'white', width: '230px' }}>Ảnh</th>
              <th style={{ backgroundColor: 'white', width: '530px' }}>Sản phẩm</th>
              <th style={{ backgroundColor: 'white' }}>Số lượng</th>
              <th style={{ backgroundColor: 'white' }}>Giá</th>
              <th style={{ backgroundColor: 'white' }}>Thành tiền</th>
              <th style={{ backgroundColor: 'white', width: '230px' }}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.cartDetailsList?.map((item, index) => {
              const totalPrice = item.amount * item.productDetails.retailPrice;
              return (
                <tr key={item.id} style={{ margin: '110px', backgroundColor: 'red' }}>
                  <td>
                    <div>{index + 1}</div>
                  </td>

                  <td>
                    <img
                      style={{ width: '200px', height: '200px' }}
                      src={item.productDetails.product.images[0]?.imgUrl}
                    />{' '}
                  </td>
                  <td style={{ textAlign: 'left', padding: '20px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      {item.productDetails.product.productName}-{item.productDetails.product.productCode}
                    </div>
                    <div style={{ fontSize: '20px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Màu săc:</span>{' '}
                      {item.productDetails.color.colorName}
                    </div>{' '}
                    <div style={{ fontSize: '20px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Chất liệu:</span>{' '}
                      {item.productDetails.material.materialName}
                    </div>{' '}
                  </td>
                  <td>
                    <div className={styles.book_number}>
                      <div className={styles.item_change1} onClick={() => handleDecrement(item)}>
                        <MinusOutlined />
                      </div>
                      <input
                        disabled
                        className={styles.input_amount}
                        value={item.amount}
                        onChange={(e) => handleQuantityChange(e, item)}
                        min={1}
                      />
                      <div className={styles.item_change2} onClick={() => handleIncrement(item)}>
                        <PlusOutlined />
                      </div>
                    </div>
                  </td>

                  <td>{item.productDetails.retailPrice} </td>
                  <td>{totalPrice} </td>
                  <td>
                    <button
                      style={{
                        border: '1px red solid ',
                        padding: '0px 50px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '12%',
                      }}
                      onClick={() => handleDeleteCartItem(item?.cartDetailId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ background: 'red', color: 'white' }}>Tổng tiền: {VNDFormaterFunc(calculateTotalPrice())}</h1>
        </div>
      </div>
    </MainLayout>
  );
}

export default CartCustomer;
