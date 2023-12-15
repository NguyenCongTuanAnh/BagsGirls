import { RightOutlined } from '@ant-design/icons';
import { Result, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BeatLoader from 'react-spinners/ClipLoader';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import billsAPI from '~/api/BillApi';
import billDetailAPI from '~/api/BillDetailsAPI';
import productDetailsAPI from '~/api/productDetailsAPI';
import './styles.scss';

const CheckoutDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [loadingPayment, setLoadingPayment] = useState(false); // State for payment loading
  const [messageApi, contextHolder] = message.useMessage();
  const [billPriceAfterVoucher, setBillPriceAfterVoucher] = useState(0);
  const location = useLocation();

  const [displayInformation, setDisplayInformation] = useState(true);
  const [displayAddress, setDisplayAddress] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const Breadcrumb = ({ steps }) => {
    return (
      <div className="breadcrumb">
        {steps.map((step, index) => (
          <Fragment key={index}>
            <span>{step}</span>
            {index !== steps.length - 1 && (
              <span>
                {' '}
                <RightOutlined style={{ fontSize: '14px' }} />{' '}
              </span>
            )}
          </Fragment>
        ))}
      </div>
    );
  };

  const steps = ['Thông tin người đặt hàng', 'Địa chỉ', 'Thanh toán'];

  useEffect(() => {
    setBillPriceAfterVoucher(location?.state?.totalPrice);
  }, [location]);
  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const formRef = useRef(null);
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.retailPrice;
    }, 0);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const [submittedData, setSubmittedData] = useState(null);

  const host = 'https://provinces.open-api.vn/api/';
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [billNote, setBillNote] = useState('');
  const [billCreateDate, setBillCreateDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const getNameFromCode = (code, list) => {
      const selectedItem = list.find((item) => item.code === +code);
      return selectedItem ? selectedItem.name : '';
    };
    const selectedProvinceName = getNameFromCode(selectedProvince, provinces);
    const selectedDistrictName = getNameFromCode(selectedDistrict, districts);
    const selectedWardName = getNameFromCode(selectedWard, wards);

    const fullAddress = `${address} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`;

    try {
      const data = {
        fullName,
        phoneNumber,
        address,
        email,
        billNote,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        fullAddress,
      };
      setDisplayAddress(true);
      setDisplayInformation(false);
      setSubmittedData(data);
      console.log('dia chi', data);
      console.log('tinh', selectedProvinceName);
      console.log('huyen', selectedDistrictName);
      console.log('xa', selectedWardName);
    } catch (error) {
      console.error('Error submitting information:', error);
    }
  };

  const updateProductDetailAmount = async (productDetailId, amountToUpdate) => {
    try {
      const response = await productDetailsAPI.updateAmount(productDetailId, amountToUpdate);

      if (response.status === 200) {
        console.log('Product detail amount updated successfully!');
      } else {
        console.error('Failed to update product detail amount:', response.data);
        // Handle failure scenario here
      }
    } catch (error) {
      console.error('Error updating product detail amount:', error);
    }
  };

  const handleConfirmation = async () => {
    setLoadingPayment(true);
    setTimeout(async () => {
      const currentTime = new Date();
      const currentDateTime = dayjs(currentTime).subtract(7, 'hour').format('YYYY-MM-DD HH:mm:ss');
      setBillCreateDate(currentDateTime);
      if (!fullName || !phoneNumber || !selectedProvince || !selectedDistrict || !selectedWard || !address) {
        console.log('Vui lòng điền đầy đủ thông tin');
        setLoadingPayment(false);
        return messageApi.open({
          type: 'error',
          content: 'Vui lòng chọn Xác nhận địa chỉ',
        });
      } else {
        setLoadingPayment(true);
      }

      const getNameFromCode = (code, list) => {
        const selectedItem = list.find((item) => item.code === +code);
        return selectedItem ? selectedItem.name : '';
      };
      const selectedProvinceName = getNameFromCode(selectedProvince, provinces);
      const selectedDistrictName = getNameFromCode(selectedDistrict, districts);
      const selectedWardName = getNameFromCode(selectedWard, wards);

      const fullAddress = `${address} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`;

      const cartItemsTotal = cartItems.reduce(
        (acc, item) => {
          acc.billTotalPrice += item.retailPrice * item.quantity;
          acc.productAmount += item.quantity;
          return acc;
        },
        { billTotalPrice: 0, productAmount: 0 },
      );
      console.log('gia tong thanh toan', billPriceAfterVoucher);
      try {
        const billData = {
          receiverName: fullName,
          orderPhone: phoneNumber,
          orderEmail: email,
          shippingAddress: fullAddress,
          billCreateDate: currentDateTime,
          billNote: billNote,
          billStatus: 4,
          billReducedPrice:0,
          billCode: generateCustomCode('Bill', 4),
          billTotalPrice: cartItemsTotal.billTotalPrice,
          productAmount: cartItemsTotal.productAmount,
          billPriceAfterVoucher: parseInt(billPriceAfterVoucher.replace(/\./g, '')),
        };
        console.log('11111111111111111', billData);
        const response = await billsAPI.add(billData);
        console.log('Billsssss', response.data);

        const billId = response.data.billId;
        console.log('BillIDdđ', billId);

        // Tạo mảng dữ liệu cho billDetails
        const billDetailsData = cartItems.map((item) => ({
          bills: {
            billId: billId,
          },
          productDetails: {
            productDetailId: item.productDetailId,
          },
          amount: item.quantity,
          billDetailStatus:1,
          billDetailNote:null,

          price: item.retailPrice,
        }));
        console.log('Cartssss', cartItems);

        const responseBillDetails = await Promise.all(
          billDetailsData.map((billDetail) => billDetailAPI.add(billDetail)),
        );

        setSubmittedData(responseBillDetails);

        await Promise.all(
          cartItems.map(async (item) => {
            // Subtract the quantity from the product detail amount
            await updateProductDetailAmount(item.productDetailId, item.quantity);
          }),
        );
        console.log('bilsssssss:', response.data);
        console.log('BilLDetails:', responseBillDetails);
        setOrderSuccess(true);
        localStorage.removeItem('temporaryCart');
        messageApi.open({
          type: 'success',
          content: 'Thanh toán thành công',
        });
      } catch (error) {
        setLoadingPayment(false);
        setTimeout(() => setLoadingPayment(true), 200);
        console.error('Error submitting information:', error);
      }
      setLoadingPayment(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get(`${host}?depth=1`)
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  const handleProvinceChange = (event) => {
    const provinceName = event.target.value;
    console.log('tinh', provinceName);
    setSelectedProvince(provinceName);
    setSelectedDistrict('');
    setSelectedWard('');

    axios
      .get(`${host}p/${provinceName}?depth=2`)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error('Error fetching districts:', error);
      });
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value;
    console.log('huyen', districtCode);
    setSelectedDistrict(districtCode);
    setSelectedWard('');

    axios
      .get(`${host}d/${districtCode}?depth=2`)
      .then((response) => {
        setWards(response.data.wards);
      })
      .catch((error) => {
        console.error('Error fetching wards:', error);
      });
  };

  const handleWardChange = (event) => {
    const wardCode = event.target.value;
    console.log('xa', wardCode);

    setSelectedWard(wardCode);
  };

  return (
    <div className="form-container">
      <Breadcrumb steps={steps} />

      {!orderSuccess && (
        <form onSubmit={handleSubmit}>
          {contextHolder}
          <div
            className="titleNhanHang"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: displayInformation ? 'black' : 'gray',
            }}
          >
            <h1>Thông tin người đặt hàng</h1>
            {!displayInformation && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <div
                  onClick={() => {
                    setDisplayInformation(true);
                    setDisplayAddress(false);
                    setDisplayOrder(false);
                  }}
                  className="changleAddress"
                >
                  Thay đổi
                </div>
              </div>
            )}
          </div>

          {displayInformation && (
            <div>
              <p>
                Bạn đã có tài khoản?{' '}
                <span>
                  <Link to={'/login'}>Đăng nhập</Link>
                </span>
              </p>
              <br></br>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                <div className="customInput">
                  <label>
                    Họ và tên<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                  </label>
                  <input
                    className="inputLabel"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Họ và tên"
                    required
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="customInput">
                  <label>
                    Số điện thoại<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                  </label>
                  <input
                    className="inputLabel"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Số điện thoại"
                    pattern="(?:\+84|0)(?:\d){9,10}$"
                    title="vui lòng nhập số điện thoại hợp lệ"
                    required
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="customInput">
                  <label>Email</label>
                  <input
                    className="inputLabel"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ( Nếu có ) "
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="vui lòng nhập email hợp lệ"
                    // required
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                <div className="customInput">
                  <label>
                    Tỉnh/ Thành phố<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                  </label>
                  <select
                    value={selectedProvince}
                    id="selectedProvince"
                    onChange={handleProvinceChange}
                    required
                    style={{ flex: 1 }}
                    className="inputLabel"
                  >
                    <option disabled value="">
                      Tỉnh/ Thành phố
                    </option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="customInput">
                  <label>
                    Quận/ Huyện<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                  </label>
                  <select
                    value={selectedDistrict}
                    id="selectedDistrict"
                    className="inputLabel"
                    onChange={handleDistrictChange}
                    required
                    style={{ flex: 1 }}
                  >
                    <option disabled value="">
                      Quận/ Huyện
                    </option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="customInput">
                  <label>
                    Phường/ Xã/ Thị trấn<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                  </label>
                  <select
                    value={selectedWard}
                    id="selectedWard"
                    onChange={handleWardChange}
                    required
                    style={{ flex: 1 }}
                    className="inputLabel"
                  >
                    <option disabled value="">
                      Phường/ Xã/ Thị trấn
                    </option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="customInput">
                <label>
                  Địa chỉ<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
                </label>
                <input
                  className="inputLabel"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Điền rõ thông tin số nhà, tên đường"
                  required
                />
              </div>
              <div className="customInput">
                <label>Ghi chú</label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={billNote}
                  onChange={(e) => setBillNote(e.target.value)}
                  placeholder="Ghi chú của khách hàng"
                />
              </div>

              <br></br>
              <button>Xác nhận địa chỉ</button>
            </div>
          )}

          <br></br>
          <hr />

          <div>
            <div
              className="titleNhanHang"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: displayAddress ? 'black' : 'gray',
              }}
            >
              <h1>Địa chỉ</h1>
            </div>
            {displayAddress && (
              <div>
                <div className="voucher">
                  <h4>Thông tin nhận hàng:</h4>
                  <p>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Người nhận:</span>{' '}
                    {submittedData?.fullName || ''}
                  </p>
                  <p>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Số điện thoại:</span>{' '}
                    {submittedData?.phoneNumber || ''}
                  </p>
                  <p>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Địa chỉ:</span>{' '}
                    {submittedData?.fullAddress || ''}
                  </p>
                  <p>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Email:</span> {submittedData?.email || ''}
                  </p>
                  <p>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Ghi Chú:</span>{' '}
                    {submittedData?.billNote || ''}
                  </p>
                </div>
                <br></br>
                <button
                  onClick={() => {
                    setDisplayAddress(false);
                    setDisplayOrder(true);
                  }}
                >
                  Tiếp tục
                </button>
              </div>
            )}
          </div>
          <hr></hr>

          <br></br>
          {true && (
            <div>
              <div
                className="titleNhanHang"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: displayOrder ? 'black' : 'gray',
                }}
              >
                <h1>Thanh toán</h1>
              </div>
              <br />
              {displayOrder && (
                <div>
                  <div className="voucher">
                    <h3>Đơn hàng:</h3>
                    {cartItems.map((item, index) => (
                      <div className={item} key={index}>
                        <div className="avatar">
                          <img src={item.image} className="image" alt={item.productName} />
                          <div className="info">
                            <div className="productTitle">{item.productName}</div>
                            <div className="titleChild">
                              <a>{`Màu: ${item.colorName}`}</a>
                              <br />
                              <a> {`Chất liệu: ${item.materialName}`}</a>
                            </div>
                            <div className="number">{`Quantity: ${item.quantity}`}</div>
                            <span className="price_sale">
                              Giá:{' '}
                              <a>
                                <span className="price">{VNDFormaterFunc(item.retailPrice)}</span>
                              </a>
                            </span>
                            <span className="price_sale">
                              Tổng:{' '}
                              <a>
                                <span className="price">{VNDFormaterFunc(item.retailPrice * item.quantity)}</span>
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pay">
                    <h3>Phương thức thanh toán:</h3>
                    <br></br>
                    <label className="labelCK">
                      <input className="inputCk" name="radioPay" checked type="radio" value={''} />
                      Thanh toán khi nhận hàng
                    </label>
                    <br></br>
                    <label className="labelCK">
                      <input className="inputCk" name="radioPay" type="radio" value={''} />
                      Chuyển khoản ngân hàng
                    </label>
                    <br></br>

                    <label className="labelCK">
                      <input className="inputCk" name="radioPay" type="radio" value={''} />
                      Ví điện tử
                    </label>
                  </div>
                  <br></br>
                  <div className="totalCheckout" style={{ fontSize: '20px' }}>
                    (1) Tổng số lượng:{' '}
                    <span style={{ color: 'darkred', fontSize: '20px' }}> {location?.state?.totalQuantity || 0}</span>
                    <br></br>
                    (2) Tạm tính:{' '}
                    <span style={{ color: 'darkred', fontSize: '20px' }}> {VNDFormaterFunc(calculateTotal())}</span>
                    <br></br>
                    (3) Voucher (%):{' '}
                    <span style={{ color: 'darkred', fontSize: '20px' }}>
                      {' '}
                      {location?.state?.disCountPercent || 0} %
                    </span>
                    <br></br>
                    (4) Giảm tiền:{' '}
                    <span style={{ color: 'darkred', fontSize: '20px' }}>
                      {' '}
                      - {VNDFormaterFunc(location?.state?.voucherPrice || 0)}
                    </span>
                    <br></br>
                    Tổng thanh toán (2) + (4):{' '}
                    <span style={{ color: 'red', fontWeight: 'bold', fontSize: '25px' }}>
                      {' '}
                      {location?.state?.totalPrice || 0}
                    </span>
                    <br />
                  </div>
                  <br />

                  <br></br>
                  <div>
                    {loadingPayment ? (
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <BeatLoader color="#d64336" loading={true} size={50} />
                        <p>Vui lòng chờ...</p>
                      </div>
                    ) : (
                      <button className="checkOut" onClick={handleConfirmation}>
                        Đặt Hàng
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      )}

      {orderSuccess && (
        <Result
          status="success"
          title="Bạn đã đặt hàng thành công. Chúc bạn 1 ngày tốt lành"
          subTitle={submittedData?.fullAddress} // Giả sử submittedData chứa thông tin fullAddress
          extra={[
            <h3 key="continuePayment">
              <Link className="btn btn-primary" to={'/'}>
                Quay về trang chủ
              </Link>
            </h3>,
          ]}
        />
      )}
    </div>
  );
};

export default CheckoutDetail;
