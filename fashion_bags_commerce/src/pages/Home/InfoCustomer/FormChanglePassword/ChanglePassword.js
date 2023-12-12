import React, { useState, useEffect, Fragment, useRef } from 'react';
import customerAPI from '~/api/customerAPI';
import axios from 'axios';
import { Radio, notification } from 'antd';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { getCustomer } from '~/api/auth/helper/UserCurrent';
import { EditOutlined, FontSizeOutlined, RollbackOutlined } from '@ant-design/icons';

function ChanglePassword() {
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
  const [gender, setGender] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const [address, setAddress] = useState('');
  const [displayUpdateAddress, setDisplayUpdateAddress] = useState(false);
  const [displayInfoAddress, setDisplayInfoAddress] = useState(true);

  const customer = getCustomer();

  useEffect(() => {
    customerAPI
      .getOne(customer.customerId)
      .then((response) => {
        const data = response.data;
        console.log(data);

        setCustomerInfo(data);
        setFullName(data.users.fullName || '');
        setPhoneNumber(data.users.phoneNumber || '');
        setAddress(data.users.address || '');
        setBirthDay(data.users.birthDay || '');
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

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
      const user = customer?.users;

      const updatedFields = {
        fullName,
        address: fullAddress,
        gender,
        birthDay,
        phoneNumber,
      };
      const filteredFields = Object.keys(updatedFields).reduce((acc, key) => {
        if (updatedFields[key] !== user[key]) {
          acc[key] = updatedFields[key];
        }
        return acc;
      }, {});

      const update = {
        customerId: customer.customerId,
        users: {
          userId: user.userId,
          ...filteredFields,
          password: user.password,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: 'ROLE_CUSTOMER',
        },
      };

      try {
        console.log(update);
        await customerAPI.update(update);

        notification.success({
          message: 'Update thành công',
          description: 'Dữ liệu đã được cập nhật thành công',
          duration: 2,
        });
        const updatedCustomerInfo = await customerAPI.getOne(customer.customerId);
        setCustomerInfo(updatedCustomerInfo.data);
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
              <h5 style={{ textAlign: 'center' }}>THAY ĐỔI MẬT KHẨU ĐĂNG NHẬP CỦA BẠN</h5>
            </div>
            <div className="thongTinKhachHang">
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Họ và tên:</span> {customerInfo.users.fullName}
              </p>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Số điện thoại:</span>{' '}
                {customerInfo.users.phoneNumber}
              </p>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Email:</span> {customer.users.email}
              </p>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Ngày sinh:</span> {customerInfo.users.birthDay}
              </p>
              <p style={{ fontSize: '15px' }}>
                <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Địa chỉ:</span> {customerInfo.users.address}
              </p>

              <div
                onClick={() => {
                  setDisplayUpdateAddress(true);
                  setDisplayInfoAddress(false);
                }}
                className="changleAddress"
                style={{
                  width: '100%',
                  background: '#ff5733',
                  padding: '20px 20px',
                  margin: '30px 0 0 0',
                  cursor: 'pointer',
                  color: 'white',
                  textAlign: 'center',
                  transition: 'background 0.3s',
                  ':hover': {
                    background: 'white',
                  },
                }}
              >
                <EditOutlined /> Thay đổi
              </div>
            </div>
          </div>
        )}
      </div>

      {displayUpdateAddress && (
        <div>
          <h5 style={{ textAlign: 'center' }}>CẬP NHẬT THÔNG TIN</h5>
          <div className="infor-custom">
            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Họ tên</div>
              <div className="infor-custom-input">
                <input
                  className="infor-custom-input-item"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} // Handle changes to fullName
                  placeholder="Họ và tên"
                />
              </div>
            </div>

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Số điện thoại</div>
              <div className="infor-custom-input">
                <input
                  className="infor-custom-input-item"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Số điện thoại"
                  pattern="(?:\+84|0)(?:\d){9,10}$"
                  title="vui lòng nhập số điện thoại hợp lệ"
                  required
                />
              </div>
            </div>

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Ngày sinh</div>
              <div className="infor-custom-input">
                <input
                  className="infor-custom-input-item"
                  type="date"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)} // Handle changes to fullName
                  placeholder="Họ và tên"
                />
              </div>
            </div>

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Tỉnh/ Thành phố</div>
              <div className="infor-custom-input">
                <select
                  value={selectedProvince}
                  id="selectedProvince"
                  onChange={handleProvinceChange}
                  required
                  style={{ flex: 1 }}
                  className="infor-custom-input-item"
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
            </div>

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Quận/ Huyện</div>
              <div className="infor-custom-input">
                <select
                  value={selectedDistrict}
                  id="selectedDistrict"
                  className="infor-custom-input-item"
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
            </div>

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Xã/ Phường</div>
              <div className="infor-custom-input">
                <select
                  value={selectedWard}
                  id="selectedWard"
                  onChange={handleWardChange}
                  required
                  style={{ flex: 1 }}
                  className="infor-custom-input-item"
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

            <div className="infor-custom-container">
              <div className="infor-custom-lable-name">Địa chỉ</div>
              <div className="infor-custom-input">
                <input
                  className="infor-custom-input-item"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} // Handle changes to fullName
                  placeholder="Địa chỉ cụ thểm tên nhà, số đường, ngõ, ..."
                />
              </div>
            </div>

            <div
              onClick={() => {
                setDisplayUpdateAddress(false); // Show the update section
                setDisplayInfoAddress(true);
              }}
            >
              <span>
                <div className="btn-container">
                  <div
                    className="btn-back"
                    onClick={() => {
                      setDisplayInfoAddress(true);
                      setDisplayUpdateAddress(false);
                    }}
                  >
                    <RollbackOutlined /> Quay lại
                  </div>

                  <div className="btn-update" onClick={handleConfirmation}>
                    <EditOutlined />
                    Cập nhật
                  </div>
                </div>
              </span>
            </div>
          </div>

          <br></br>
        </div>
      )}
    </div>
  );
}

export default ChanglePassword;
