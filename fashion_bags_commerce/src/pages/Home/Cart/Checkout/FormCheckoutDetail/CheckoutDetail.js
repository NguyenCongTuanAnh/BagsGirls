import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './styles.scss';
import { Link } from 'react-router-dom';
import billsAPI from '~/api/BillApi';
import dayjs from 'dayjs';
import { Input, Button, notification, Result } from 'antd';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';

const CheckoutDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [confirmedAddress, setConfirmedAddress] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(true);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.retailPrice;
    }, 0);
  };

  const [notificationMessage, setNotificationMessage] = useState('');
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
      console.log(list, code);
      const selectedItem = list.find((item) => item.code === parseInt(code));
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

      setSubmittedData(data);
      console.log('dia chi', data);
      console.log('tinh', selectedProvinceName);
      console.log('huyen', selectedDistrictName);
      console.log('xa', selectedWardName);
    } catch (error) {
      console.error('Error submitting information:', error);
    }
  };
  const handleConfirmation = async () => {
    const currentTime = new Date();
    const currentDateTime = dayjs(currentTime).subtract(7, 'hour').format('YYYY-MM-DD HH:mm:ss');
    setBillCreateDate(currentDateTime);

    const getNameFromCode = (code, list) => {
      const selectedItem = list.find((item) => item.code === +code);
      return selectedItem ? selectedItem.name : '';
    };
    const selectedProvinceName = getNameFromCode(selectedProvince, provinces);
    const selectedDistrictName = getNameFromCode(selectedDistrict, districts);
    const selectedWardName = getNameFromCode(selectedWard, wards);

    const fullAddress = `${address} | ${selectedWardName} | ${selectedDistrictName} | ${selectedProvinceName}`;

    try {
      const billData = {
        receiverName: fullName,
        orderPhone: phoneNumber,
        orderEmail: email,
        shippingAddress: fullAddress,
        billCreateDate: currentDateTime,
        billNote: billNote,
        billStatus: 4,
        billCode: generateCustomCode('Bill', 4),
      };

      const response = await billsAPI.add(billData);
      setConfirmedAddress(true);
      setShowAddressForm(false);
      console.log('Successful information submission, Bill Code:', response.data.billCode);
      console.log('Successful information submission:', response.data);

      setSubmittedData(billData);
    } catch (error) {
      console.error('Error submitting information:', error);
    }
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
      {/* <div className="col-6"> */}
      {showAddressForm && (
        <form onSubmit={handleSubmit}>
          <div className="titleNhanHang">
            <h1>Thông tin người đặt hàng</h1>
          </div>
          <p>
            Bạn đã có tài khoản?{' '}
            <span>
              <Link to={'/login'}>Đăng nhập</Link>
            </span>
          </p>
          <br></br>
          <input
            className="inputLabel"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Họ và tên"
            required
          />
          <input
            className="inputLabel"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Số điện thoại"
            required
          />
          <input
            className="inputLabel"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ( Nếu có ) "
            // required
          />
          <select value={selectedProvince} id="selectedProvince" onChange={handleProvinceChange}>
            <option disabled value="">
              Chọn Tỉnh/Thành phố
            </option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
          <select value={selectedDistrict} id="selectedDistrict" onChange={handleDistrictChange}>
            <option disabled value="">
              Chọn Quận/Huyện
            </option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
          <select value={selectedWard} id="selectedWard" onChange={handleWardChange}>
            <option disabled value="">
              Chọn Phường/Xã
            </option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
          <input
            className="inputLabel"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Điền rõ thông tin số nhà, tên đường"
            required
          />
          <textarea
            className=""
            rows={5}
            value={billNote}
            onChange={(e) => setBillNote(e.target.value)}
            placeholder="Ghi chú của khách hàng"
          />

          <br></br>
          <button>Giao đến địa chỉ này</button>
          <br></br>
          {submittedData && !confirmedAddress && (
            <div>
              <h2>Thông tin người đặt hàng:</h2>
              <table className="table table-stripped table table-bordered" style={{ width: '100%', height: 'auto' }}>
                <tbody>
                  <tr>
                    <th>Họ và tên:</th>
                    <td>{submittedData.fullName}</td>
                  </tr>
                  <tr>
                    <th>Số điện thoại:</th>
                    <td>{submittedData.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{submittedData.email}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ:</th>
                    <td style={{ maxHeight: '100px', maxWidth: '300px', overflowY: 'auto' }}>
                      {submittedData.fullAddress}
                    </td>
                  </tr>
                  <tr>
                    <th>Ghi chú:</th>
                    <td style={{ maxHeight: '100px', maxWidth: '300px', overflowY: 'auto' }}>
                      {submittedData.billNote}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <br></br>

          <button onClick={handleConfirmation} style={{ display: submittedData ? 'block' : 'none' }}>
            Xác nhận địa chỉ
          </button>
          <br></br>
          {confirmedAddress && (
            <div>
              <h4>Đã xác nhận địa chỉ giao hàng thành công</h4>
            </div>
          )}
        </form>
      )}
      {!showAddressForm && confirmedAddress && (
        <Result
          status="success"
          title="Thành công xác nhận địa chỉ"
          subTitle={submittedData.fullAddress} // Giả sử submittedData chứa thông tin fullAddress
          extra={[<h3 key="continuePayment">Mời tiếp tục thanh toán</h3>]}
        />
      )}

      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <form className="list_product">
        <div className="titleNhanHang">
          <h1>Đơn hàng</h1>
        </div>
        <br />

        {cartItems.map((item, index) => (
          <div className={item} key={index}>
            {/* Render each item as needed */}
            <div className="avatar">
              <img src={item.image} className="image" alt={item.productName} />
              <div className="info">
                <div className="productTitle">{item.productName}</div>
                <div className="titleChild">
                  <i>{`Color: ${item.colorName}`}</i>
                  <br />
                  <i> {`Material: ${item.materialName}`}</i>
                </div>
                <div className="number">{`Quantity: ${item.quantity}`}</div>
                <span className="price_sale">
                  Price:{' '}
                  <ins>
                    <span className="price">{VNDFormaterFunc(item.retailPrice)}</span>
                  </ins>
                </span>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div>
          <h3>
            Tổng tiền: <span style={{ color: 'red' }}> {VNDFormaterFunc(calculateTotal())}</span>
          </h3>
        </div>

        <hr />
        <div className="voucher">
          <h4>Voucher:</h4>
        </div>

        <div className="pay">
          <h3>Phương thức thanh toán:</h3>
          <br></br>
          <label className="labelCK">
            <input className="inputCk" name="radioPay" type="radio" value={''} />
            Chuyển khoản ngân hàng
          </label>
          <br></br>
          <label className="labelCK">
            <input className="inputCk" name="radioPay" type="radio" value={''} />
            Thanh toán khi nhận hàng
          </label>
          <br></br>

          <label className="labelCK">
            <input className="inputCk" name="radioPay" type="radio" value={''} />
            Ví điện tử
          </label>
        </div>
        <br></br>
        <div className="totalCheckout">
          <br />
          <h4>
            Tổng thanh toán: <span style={{ color: 'red' }}> {VNDFormaterFunc(calculateTotal())}</span>
          </h4>
          <br />
        </div>
        <br />

        <button className="checkOut">Thanh toán</button>
      </form>
    </div>
  );
};

export default CheckoutDetail;
