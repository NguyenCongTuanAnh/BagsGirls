import React, { useState, useEffect, Fragment, useRef } from 'react';
import customerAPI from '~/api/customerAPI';
import axios from 'axios';

function AddressCustomer() {
  const [customerInfo, setCustomerInfo] = useState(null); // Lưu thông tin khách hàng
  const host = 'https://provinces.open-api.vn/api/';
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  //   const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const customerId = localStorage.getItem('customerId');

  //   useEffect(() => {
  //     const customerId = localStorage.getItem('customerId');
  //     customerAPI
  //       .getOne(customerId)
  //       .then((response) => {
  //         const data = response.data;
  //         // Lưu dữ liệu từ API vào state
  //         setCustomerData({
  //           fullName: data.fullName || '',
  //           phoneNumber: data.phoneNumber || '',
  //           address: data.address || '',
  //         });
  //       })
  //       .catch((error) => {
  //         console.error('Lỗi khi lấy thông tin khách hàng:', error);
  //       });
  //   }, []);

  const handleConfirmation = async () => {
    const getNameFromCode = (code, list) => {
      const selectedItem = list.find((item) => item.code === +code);
      return selectedItem ? selectedItem.name : '';
    };
    const selectedProvinceName = getNameFromCode(selectedProvince, provinces);
    const selectedDistrictName = getNameFromCode(selectedDistrict, districts);
    const selectedWardName = getNameFromCode(selectedWard, wards);

    const fullAddress = `${address} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`;
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
        <h5>Địa CHỈ</h5>
        {customerInfo && (
          <div style={{ border: '1px solid black', borderRadius: '8px', width: '1300px', padding: '10px 0 0 10px' }}>
            <p style={{ fontSize: '15px' }}>
              <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Địa chỉ:</span> {customerInfo.users.address}
            </p>
            <p style={{ fontSize: '15px' }}>
              <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Số điện thoại:</span>{' '}
              {customerInfo.users.phoneNumber}
            </p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
              <div onClick={() => {}} className="changleAddress" style={{ margin: '-60px 10px 0 0' }}>
                Thay đổi
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h5>CẬP NHẬT ĐỊA CHỈ</h5>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
          <div className="customInput">
            <label>
              Họ và tên<span style={{ color: '#ff0000', fontWeight: 'bold' }}> * </span>
            </label>
            <input
              type="text"
              //   value={fullName}
              //   onChange={(e) => setFullName(e.target.value)}
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
              // size={10}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại"
              // pattern="(?:\+84|0)(?:\d){9,10}$"
              title="vui lòng nhập số điện thoại hợp lệ"
              // required
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
              // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
              // required
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
              // required
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
              // required
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
            // required
          />
        </div>

        <br></br>
        <button>Xác nhận địa chỉ</button>
      </div>
    </div>
  );
}

export default AddressCustomer;
