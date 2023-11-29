import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import { Link } from 'react-router-dom';
import billsAPI from '~/api/BillApi';
import dayjs from 'dayjs';
import { Button, notification } from 'antd';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';

const AddressVietnam = () => {
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

  const [billCreateDate, setBillCreateDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullAddress = `${address} | ${selectedWard} | ${selectedDistrict} | ${selectedProvince}`;

    try {
      setSubmittedData({
        fullName,
        phoneNumber,
        address,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        fullAddress,
      });
      setNotificationMessage('Địa chỉ đã được thêm thành công!');
    } catch (error) {
      console.error('Error submitting information:', error);
    }
  };

  const handleConfirmation = async () => {
    const currentTime = new Date();
    const currentDateTime = dayjs(currentTime).subtract(7, 'hour').format('YYYY-MM-DD HH:mm:ss');

    const utcTime = currentTime.toISOString();

    const localTime = new Date(utcTime);
    setBillCreateDate(currentDateTime);

    const fullAddress = `${address} | ${selectedWard} | ${selectedDistrict} | ${selectedProvince}`;

    try {
      const billData = {
        receiverName: fullName,
        orderPhone: phoneNumber,
        shippingAddress: fullAddress,
        billCreateDate: currentDateTime,
        billStatus: 4,
        billCode: generateCustomCode('Bill', 4),
      };

      const response = await billsAPI.add(billData);
      console.log('Successful information submission, Bill Code:', response.data.billCode);
      console.log('Successful information submission:', response.data);
    } catch (error) {
      console.error('Error submitting information:', error);
    }
  };
  const getAddressName = (code, type) => {
    let name = '';
    switch (type) {
      case 'ward':
        name = wards.find((ward) => ward.code === code)?.name || '';
        break;
      case 'district':
        name = districts.find((district) => district.code === code)?.name || '';
        break;
      case 'province':
        name = provinces.find((province) => province.code === code)?.name || '';
        break;
      default:
        break;
    }
    return name;
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
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict('');
    setSelectedWard('');

    axios
      .get(`${host}p/${provinceCode}?depth=2`)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error('Error fetching districts:', error);
      });
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value;
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
    setSelectedWard(wardCode);
  };

  return (
    <div className="form-container">
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
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option disabled value="">
            Chọn Tỉnh/Thành phố
          </option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option disabled value="">
            Chọn Quận/Huyện
          </option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
        <select value={selectedWard} onChange={handleWardChange}>
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
          placeholder="Điền rõ thông tin số nhà, tên đường, xã, huyện, tỉnh"
          required
        />
        <button>Giao đến địa chỉ này</button>
        <br></br>
        {submittedData && (
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
                  <th>Địa chỉ:</th>
                  <td style={{ maxHeight: '100px', maxWidth: '300px', overflowY: 'auto' }}>
                    {submittedData.fullAddress}
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
      </form>
    </div>
  );
};

export default AddressVietnam;
