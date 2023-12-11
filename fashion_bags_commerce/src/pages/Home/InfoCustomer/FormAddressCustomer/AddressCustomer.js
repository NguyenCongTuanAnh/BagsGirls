import React, { useState, useEffect, Fragment, useRef } from 'react';
import customerAPI from '~/api/customerAPI';
import axios from 'axios';
import { notification } from 'antd';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { getCustomer } from '~/api/auth/helper/UserCurrent';

function AddressCustomer() {
  const [customerInfo, setCustomerInfo] = useState(null);
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
  const [customerData, setCustomerData] = useState({});
  const [displayUpdateAddress, setDisplayUpdateAddress] = useState(false);
  const [displayInfoAddress, setDisplayInfoAddress] = useState(true);

  const customer = getCustomer();


  useEffect(() => {
    customerAPI
      .getOne(customer.customerId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setCustomerData({
          fullName: data.users.fullName || '',
          phoneNumber: data.users.phoneNumber || '',
          address: data.users.address || '',
        });
        setCustomerInfo(data);
        setFullName(data.users.fullName || '');
        setPhoneNumber(data.users.phoneNumber || '');
        setAddress(data.users.address || '');
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);
  console.log('Customer Info:', customerInfo);

  const handleConfirmation = async () => {
    const getNameFromCode = (code, list) => {
      const selectedItem = list.find((item) => item.code === +code);
      return selectedItem ? selectedItem.name : '';
    };
    const selectedProvinceName = getNameFromCode(selectedProvince, provinces);
    const selectedDistrictName = getNameFromCode(selectedDistrict, districts);
    const selectedWardName = getNameFromCode(selectedWard, wards);

    const fullAddress = `${address} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`;

    const updateFunction = async () => {
      const userId = customer?.users?.userId || '';

      const update = {
        customerId: customer.customerId,
        users: {
          userId: userId,
          fullName: fullName,
          address: fullAddress,
        },
      };

      try {
        console.log(update);
        await customerAPI.update(update);
        notification.success({
          message: 'Update thành công',
          description: 'Dữ liệu đã được thêm thành công',
          duration: 2,
        });

        // Đóng Modal sau khi thêm thành công (implement closing the modal here)
      } catch (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng xác nhận',
          duration: 2,
        });
        console.log(error);
      }
    };

    updateFunction();
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
    <div>
      <div>
        {customerInfo && displayInfoAddress && (
          <div>
            <div>
              <h5>Địa CHỈ</h5>
            </div>
            <div style={{ border: '1px solid black', borderRadius: '8px', width: '1300px', padding: '10px 0 0 10px' }}>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Địa chỉ:</span> {customerInfo.users.address}
              </p>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Số điện thoại:</span>{' '}
                {customerInfo.users.phoneNumber}
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <div
                  onClick={() => {
                    setDisplayUpdateAddress(true);
                    setDisplayInfoAddress(false);
                  }}
                  className="changleAddress"
                  style={{ margin: '-60px 10px 0 0' }}
                >
                  Thay đổi
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {displayUpdateAddress && (
        <div>
          <h5>CẬP NHẬT ĐỊA CHỈ</h5>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
            <div className="customInput">
              <label>
                Họ và tên<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // Handle changes to fullName
                placeholder="Họ và tên"
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

          <br></br>
          <div
            onClick={() => {
              setDisplayUpdateAddress(false); // Show the update section
              setDisplayInfoAddress(true);
            }}
          >
            <span>
              <button className="changleAddress" onClick={handleConfirmation}>
                Cập nhật
              </button>
              <div
                className="changleAddress"
                onClick={() => {
                  setDisplayInfoAddress(true);
                  setDisplayUpdateAddress(false);
                }}
              >
                Quay lại
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressCustomer;
