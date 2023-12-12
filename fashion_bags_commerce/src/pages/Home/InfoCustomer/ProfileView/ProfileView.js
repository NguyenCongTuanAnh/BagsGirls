import { KeyOutlined, RightOutlined, ShoppingCartOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import React, { useState, Fragment } from 'react';
import { Radio, Space, Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import './profile.css';
import AddressCustomer from '../InformationCustomer/InformationCustomer';
import { getCustomer } from '~/api/auth/helper/UserCurrent';
import ChanglePassword from '../FormChanglePassword/ChanglePassword';
function ProfileView() {
  const location = useLocation();
  const { TabPane } = Tabs;

  // const [customer, setCutomer] = useState(JSON.parse(localStorage.getItem('customerTokenString')));
  const customer = getCustomer();

  // console.log(("thong tin khach hang",customer));
  const [displayTapTop, setDisplayTapTop] = useState(true);

  const handleTabClick = (key) => {
    if (key === '2' || key === '3' || key === '4' || key === '5') {
      setDisplayTapTop(false);
    } else {
      setDisplayTapTop(true);
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

  const steps = ['Trang chủ', 'Profile'];

  return (
    <div>
      <Breadcrumb steps={steps} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
        <div className="tabLeft">
          <div className="tabLeftChild">
            <Tabs defaultActiveKey="1" tabPosition="left" onTabClick={handleTabClick}>
              <TabPane
                style={{ background: 'gray' }}
                tab={
                  <span className="tabLeftChildRow" style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>
                    <StarFilled />
                    TÀI KHOẢN VIP
                  </span>
                }
                key="1"
              ></TabPane>
              <TabPane
                tab={
                  <span className="tabLeftChildRow">
                    <UserOutlined />
                    Thông tin cá nhân
                  </span>
                }
                key="2"
              >
                <AddressCustomer />
              </TabPane>
              <TabPane
                tab={
                  <span className="tabLeftChildRow">
                    <KeyOutlined />
                    Đổi mật khẩu
                  </span>
                }
                key="3"
              >
                <ChanglePassword />
              </TabPane>

              <TabPane
                tab={
                  <span className="tabLeftChildRow">
                    <ShoppingCartOutlined />
                    Đơn hàng của tôi
                  </span>
                }
                key="5"
              >
                Nội dung tab đơn hàng
              </TabPane>
            </Tabs>
          </div>
        </div>
        {displayTapTop && (
          <div className="tabTop">
            <Tabs defaultActiveKey="1" tabPosition="top" className="tabTop">
              <TabPane
                className="tabTopChild"
                tab={<span style={{ fontSize: '25px', padding: '0 100px' }}>Hạng và điểm hiện tại</span>}
                key="1"
              >
                Nội dung tab địa chỉ
              </TabPane>
              <TabPane
                className="tabTopChild"
                tab={<span style={{ fontSize: '25px', padding: '0 100px' }}>Lịch sử giao dịch</span>}
                key="2"
              >
                Nội dung tab giao dịch
              </TabPane>
              <TabPane
                className="tabTopChild"
                tab={<span style={{ fontSize: '25px', padding: '0 100px' }}>Quy chế lên hạng</span>}
                key="3"
              >
                Nội dung tab lên hạng
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
      <br></br>
    </div>
  );
}

export default ProfileView;
