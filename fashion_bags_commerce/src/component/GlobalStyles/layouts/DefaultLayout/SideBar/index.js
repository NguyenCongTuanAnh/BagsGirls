import {
  AppstoreOutlined,
  BarChartOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  PaperClipOutlined,
  RedEnvelopeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
  ContactsOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Avartar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar/Avartar/index';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './index.module.scss';
import { hover } from '@testing-library/user-event/dist/hover';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link style={{ textDecoration: 'none' }} to={'/admin'}>
      Trang chủ
    </Link>,
    'sub1',
    <HomeOutlined style={{ fontSize: '23px' }} />,
  ),
  getItem('Quản lý Bán Hàng', 'sub2', <ShoppingCartOutlined style={{ fontSize: '23px' }} />, [
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/sales-counter'}>
        Bán Hàng Tại Quầy
      </Link>,
      '4',
    ),
    getItem('Quản lý Đặt Hàng', '5'),
    getItem('Submenu', 'sub3', <AppstoreOutlined style={{ fontSize: '23px' }} />, [
    
    ]),
  ]),
  getItem('Quản lý Hóa Đơn', 'sub4', <PaperClipOutlined style={{ fontSize: '23px' }} />, [
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/bill-online-view'}>
        Hóa đơn online
      </Link>,
      '6',
    ),
    getItem(<Link style={{ textDecoration: 'none' }} to={'/bill-offline-view'}>
      Hóa đơn tại quầy
    </Link>,
      '7',),
  ]),

  getItem('Quản lý Sản Phẩm', 'sub999', <CalendarOutlined style={{ fontSize: '23px' }} />, [
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/product-add'}>
        Thêm Sản Phẩm
      </Link>,
      '10',
    ),
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/product-viewer'}>
        Danh Sách Sản Phẩm
      </Link>,
      '11',
    ),
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/view-productDetails'}>
        Sản Phẩm Chi Tiết
      </Link>,
      '122',
    ),
  ]),
  getItem('Danh mục sản phẩm', 'sub11', <AppstoreOutlined style={{ fontSize: '23px' }} />, [
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/color-view'}>
        Màu sắc
      </Link>,
      '12',
    ),
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/brand-view'}>
        Thương hiệu
      </Link>,
      '13',
    ),

    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/size-view'}>
        Kích cỡ
      </Link>,
      '14',
    ),

    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/material-view'}>
        Chất liệu
      </Link>,
      '15',
    ),
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/type-view'}>
        Kiểu balo{' '}
      </Link>,
      '16',
    ),

    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/buckle-type-view'}>
        Kiểu khóa
      </Link>,
      '17',
    ),

    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/compartment-view'}>
        Ngăn
      </Link>,
      '18',
    ),

    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/producer-view'}>
        Nhà sản xuất
      </Link>,
      '19',
    ),
  ]),
  getItem(
    <Link style={{ textDecoration: 'none' }} to={'/voucher-view'}>
      Quản lý Voucher
    </Link>,
    'sub6',
    <RedEnvelopeOutlined style={{ fontSize: '23px' }} />,
  ),
  getItem(
    <Link style={{ textDecoration: 'none' }} to={'/staff-view'}>
      Quản lý Nhân Viên
    </Link>,
    'sub7',
    <UserOutlined style={{ fontSize: '23px' }} />,
  ),
  getItem(
    <Link style={{ textDecoration: 'none' }} to={'/customer-view'}>
      Quản lý Khách Hàng
    </Link>,
    'sub8',
    <TeamOutlined style={{ fontSize: '23px' }} />,
  ),
  getItem('Giao Ca', 'sub10', <ContactsOutlined style={{ fontSize: '23px' }} />, [
    getItem(
      <Link style={{ textDecoration: 'none' }} to={'/shift-view'}>
        Danh sách ca làm việc
      </Link>,
      '34',
    ),
    getItem('Option 10', '35'),
    getItem('Option 11', '36'),
    getItem('Option 12', '37'),
  ]),
  getItem('Thống Kê ', 'sub9', <BarChartOutlined style={{ fontSize: '23px' }} />, [
    getItem('Option 9', '38'),
    getItem('Option 10', '39'),
    getItem('Option 11', '40'),
    getItem('Option 12', '41'),
  ]),
];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub999'];
function Sidebar(props) {
  const { key, keyIndex, openKey } = props;
  const [openKeys, setOpenKeys] = useState([props.openKey]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className={style.sidebar} style={{ height: '100vh' }}>
      <div style={{ padding: ' 0px 30px' }}>
        <Avartar />
        <hr />
      </div>
      <Menu
        className={style.menuCustom}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={[props.keyIndex]}
        defaultOpenKeys={openKeys}
        style={{
          width: '260px',
          height: 'auto',
          // color: 'white',
        }}
        items={items}
      ></Menu>
    </div>
  );
}

export default Sidebar;
