import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cartAPI from '~/api/cartAPI';
import MainLayout from '../../MainLayout';

function CartCustomer() {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');

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
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchCart();
  }, [customerId]);

  return (
    <MainLayout>
      {' '}
      <div className="" style={{ padding: '0 5% 0 5%' }}>
        <h1></h1>
        <table
          style={{ textAlign: 'center', width: '100%', borderCollapse: 'collapse' }}
          className="table table-bordered"
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: 'gray' }}>STT</th>
              <th style={{ backgroundColor: 'gray' }}>Ảnh</th>
              <th style={{ backgroundColor: 'gray' }}>Sản phẩm</th>
              <th style={{ backgroundColor: 'gray' }}>Số lượng</th>
              <th style={{ backgroundColor: 'gray' }}>Giá</th>
              <th style={{ backgroundColor: 'gray' }}>Thành tiền</th>
              <th style={{ backgroundColor: 'gray' }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.cartDetailsList?.map((item, index) => {
              const totalPrice = item.amount * item.productDetails.retailPrice;
              return (
                <tr key={item.id}>
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
                  <td>{item.amount} </td>
                  <td>{item.productDetails.retailPrice} </td>
                  <td>{totalPrice} </td>
                  <td>
                    <button>Xóa</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default CartCustomer;
