import { RightOutlined } from '@ant-design/icons';
import { Form, Result, message } from 'antd';
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
import { getCustomer } from '~/api/auth/helper/UserCurrent';
import AddressCustomer from '~/pages/Home/InfoCustomer/InformationCustomer/InformationCustomer';
import customerAPI from '~/api/customerAPI';
import voucherAPI from '~/api/voucherAPI';
import moment from 'moment/moment';
import Search from 'antd/es/input/Search';

const CheckoutDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const customerId = localStorage.getItem('customerId');
  const [address1, setAddress1] = useState(null);

  // const addressFromLocalStorage = { address };
  const displayInformationSection = address1 === null;
  const [totalPrice, setTotalPrice] = useState(0);

  const [loadingPayment, setLoadingPayment] = useState(false); // State for payment loading
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const [cartDetailss, setCartetailss] = useState([]);

  const [displayInformation, setDisplayInformation] = useState(true);
  const [displayAddress, setDisplayAddress] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [voucherPrice, setVoucherPrice] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucher, setVoucher] = useState('');
  const [disCountPercent, setDiscountPercent] = useState(0);
  const [form] = Form.useForm();

  const [customerData, setCustomerData] = useState([]);

  const getOneCustomer = async () => {
    try {
      const response = await customerAPI.getOne(customerId);
      const data = response.data;
      console.log(data);
      setCustomerData(data);
      setAddress1(data.users.address || '');
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  useEffect(() => {
    getOneCustomer(customerId);
  });

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
  const handleApplyVoucherCode1 = async () => {
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
          console.log('tong gia bill', calculateTotalCustomer());

          if (voucher.totalPriceToReceive <= calculateTotalCustomer()) {
            setDiscountPercent(voucher.discountPercent);
            const calculatedVoucherPrice = calculateTotalCustomer() * (voucher.discountPercent / 100) || voucherPrice;
            setVoucherPrice(calculatedVoucherPrice);
            const discountedTotalPrice = calculateTotalCustomer() - calculatedVoucherPrice;
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

  useEffect(() => {
    console.log('dia chi', cartDetailss);
    console.log('hinh anh', cartDetailss);
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
  const calculateTotalCustomer = () => {
    return location?.state?.totalPrice1;
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('temporaryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    console.log('storedCart', storedCart);
    // console.log('tongBill', calculateTotal());
    // console.log('tongBill', calculateTotalCustomer());
  }, []);

  useEffect(() => {
    const storeCartDetail = location.state?.cartItems;
    if (storeCartDetail) {
      setCartetailss(storeCartDetail);
    }
    console.log('storeCartDetail', storeCartDetail);
    console.log('totalPrice', totalPrice);
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
  const handleSubmit1 = async (event) => {
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
      setFullName(customerData.users.fullName);
      setPhoneNumber(customerData.users.phoneNumber);
      setEmail(customerData.users.email);
      setDisplayAddress(true);
      setDisplayInformation(false);
      setSubmittedData(data);
      console.log('dia chi', data);
      console.log('tinh', selectedProvinceName);
      console.log('huyen', selectedDistrictName);
      console.log('xa', selectedWardName);
      console.log('hoTenCustomer', fullName);
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
      try {
        const billData = {
          receiverName: fullName,
          orderPhone: phoneNumber,
          orderEmail: email,
          shippingAddress: fullAddress,
          billCreateDate: currentDateTime,
          billNote: billNote,
          billStatus: 4,
          billReducedPrice: 0,
          billCode: generateCustomCode('Bill', 4),
          billTotalPrice: location?.state?.totalPrice,
          productAmount: location?.state?.totalQuantity,
          billPriceAfterVoucher: totalPrice || location?.state?.totalPrice,
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
          billDetailStatus: 1,
          billDetailNote: null,

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

  const handleConfirmation1 = async () => {
    await customerAPI
      .getOne(customerId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setCustomerData(data);

        setAddress1(data.users.address || '');
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });

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

      try {
        const billData = {
          receiverName: fullName,
          orderPhone: phoneNumber,
          orderEmail: email,
          shippingAddress: fullAddress,
          billCreateDate: currentDateTime,
          billNote: billNote,
          billStatus: 4,
          billReducedPrice: 0,
          billCode: generateCustomCode('Bill', 4),
          billTotalPrice: location?.state?.totalPrice1,
          productAmount: location?.state?.totalAmount,
          billPriceAfterVoucher: totalPrice || location?.state?.totalPrice1,
          customer: {
            customerId: customerId,
            users: {
              fullName: fullName,
              phoneNumber: phoneNumber,
              email: email,
              address: fullAddress,
            },
          },
        };
        console.log('11111111111111111', billData);
        const response = await billsAPI.add(billData);
        console.log('Billsssss', response.data);

        // const customerData = {
        //   customerStatus:

        // };
        // const response1 = await customerAPI.add(customerData);

        const billId = response.data.billId;
        console.log('BillIDdđ', billId);

        // Tạo mảng dữ liệu cho billDetails
        const billDetailsData = cartDetailss.map((item) => ({
          bills: {
            billId: billId,
          },
          productDetails: {
            productDetailId: item.productDetails.productDetailId,
          },
          amount: item.amount,
          billDetailStatus: 1,
          billDetailNote: null,

          price: item.productDetails.retailPrice,
        }));

        const responseBillDetails = await Promise.all(
          billDetailsData.map((billDetail) => billDetailAPI.add(billDetail)),
        );

        setSubmittedData(responseBillDetails);

        await Promise.all(
          cartDetailss.map(async (item) => {
            // Subtract the quantity from the product detail amount
            await updateProductDetailAmount(item.productDetails.productDetailId, item.amount);
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
      {/* <Breadcrumb steps={steps} /> */}

      {!orderSuccess && (
        <form onSubmit={customerId == null ? handleSubmit : handleSubmit1}>
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
            <div style={{ width: '100%' }}>
              <Fragment>
                <div>
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
                    {customerId == null ? (
                      <div>
                        {/* <p>
                        Bạn đã có tài khoản?{' '}
                        <span>
                          <Link to={'/login'}>Đăng nhập</Link>
                        </span>
                      </p> */}
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
                              placeholder="Nhập email"
                              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                              title="vui lòng nhập email hợp lệ"
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
                    ) : (
                      <div>
                        <br></br>
                        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
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
                        </div> */}

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
                        <button
                          onClick={() => {
                            setFullName(customerData.users.fullName);
                            setPhoneNumber(customerData.users.phoneNumber);
                            setEmail(customerData.users.email);
                            setAddress(customerData.users.address)
                          }}
                        >
                          Xác nhận địa chỉ
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            </div>
          </div>

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
                  {customerId != null ? (
                    <div className="voucher">
                      <h3>Đơn hàng</h3>
                      {Array.isArray(cartDetailss) &&
                        cartDetailss.map((cartDetailss, index) => (
                          <div className="avatar" key={index}>
                            <img src={cartDetailss.productDetails.product.images[0].imgUrl} className="image" />
                            <div className="info">
                              <div className="productTitle">{cartDetailss.productDetails.product.productName}</div>
                              <div className="titleChild">
                                <a>{`Màu: ${cartDetailss.productDetails.color.colorName}`}</a>
                                <br />
                                <a>{`Chất liệu: ${cartDetailss.productDetails.material.materialName}`}</a>
                              </div>
                              <div className="number">{`Số lượng: ${cartDetailss.amount}`}</div>
                              {/* Add your price calculations here */}
                              <span className="price_sale">
                                Giá:{' '}
                                <a>
                                  <span className="price">
                                    {VNDFormaterFunc(cartDetailss.productDetails.retailPrice)}
                                  </span>
                                </a>
                              </span>
                              <span className="price_sale">
                                Tổng:{' '}
                                <a>
                                  <span className="price">
                                    {VNDFormaterFunc(cartDetailss.amount * cartDetailss.productDetails.retailPrice)}
                                  </span>
                                </a>
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
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
                  )}

                  {customerId == null ? (
                    <div className="voucher">
                      <h3>Voucher:</h3>

                      <div
                        style={{
                          height: '100px',
                          border: '1px solid black',
                        }}
                      >
                        <Form>
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
                      </div>
                    </div>
                  ) : (
                    <div className="voucher">
                      <h3>Voucher:</h3>

                      <div
                        style={{
                          height: '100px',
                          border: '1px solid black',
                        }}
                      >
                        <Form>
                          <Form.Item>
                            <Search
                              onChange={(e) => {
                                setVoucherCode(e.target.value);
                              }}
                              enterButton="Áp dụng"
                              onSearch={handleApplyVoucherCode1}
                              value={voucherCode}
                              placeholder="(Nếu có)"
                            />
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  )}
                  {/* <div className="pay">
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
                  </div> */}
                  <br></br>
                  {customerId != null ? (
                    <div className="totalCheckout" style={{ fontSize: '20px' }}>
                      (1) Tổng số lượng:{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}> {location?.state?.totalAmount || 0}</span>
                      <br></br>
                      (2) Tạm tính:{' '}
                      <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>
                        {' '}
                        {VNDFormaterFunc(location?.state?.totalPrice1 || 0)}
                      </span>
                      <br></br>
                      (3) Voucher (%):{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}> {disCountPercent || 0} %</span>
                      <br></br>
                      (4) Giảm tiền:{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}>
                        {' '}
                        - {VNDFormaterFunc(voucherPrice || 0)}
                      </span>
                      <br></br>
                      Tổng thanh toán (2) + (4):{' '}
                      <span style={{ color: 'red', fontWeight: 'bold', fontSize: '25px' }}>
                        {' '}
                        {VNDFormaterFunc(totalPrice || location?.state?.totalPrice1)}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <div className="totalCheckout" style={{ fontSize: '20px' }}>
                      (1) Tổng số lượng:{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}> {location?.state?.totalQuantity || 0}</span>
                      <br></br>
                      (2) Tạm tính:{' '}
                      <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>
                        {' '}
                        {VNDFormaterFunc(location?.state?.totalPrice || 0)}
                      </span>
                      <br></br>
                      (3) Voucher (%):{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}> {disCountPercent || 0} %</span>
                      <br></br>
                      (4) Giảm tiền:{' '}
                      <span style={{ color: 'darkred', fontSize: '20px' }}>
                        {' '}
                        - {VNDFormaterFunc(voucherPrice || 0)}
                      </span>
                      <br></br>
                      Tổng thanh toán (2) + (4):{' '}
                      <span style={{ color: 'red', fontWeight: 'bold', fontSize: '25px' }}>
                        {' '}
                        {VNDFormaterFunc(totalPrice || location?.state?.totalPrice)}
                      </span>
                      <br />
                    </div>
                  )}
                  <br />

                  <br></br>
                  {customerId == null ? (
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
                  ) : (
                    <div>
                      {loadingPayment ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                          <BeatLoader color="#d64336" loading={true} size={50} />
                          <p>Vui lòng chờ...</p>
                        </div>
                      ) : (
                        <button className="checkOut" onClick={handleConfirmation1}>
                          Đặt Hàng
                        </button>
                      )}
                    </div>
                  )}
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
