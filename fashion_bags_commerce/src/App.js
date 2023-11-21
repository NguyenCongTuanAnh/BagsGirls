import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Navigate, redirect } from 'react-router-dom';

import Admin from './pages/Admin';
import ProductViewer from './pages/Admin/ProductManager/ProductViewer';
import ShiftViewer from './pages/Admin/Shift/ShiftViewer';
import Login from './pages/Login/indexLoginView';
import Home from './pages/Home';
import ColorView from './pages/Admin/ThuocTinhSanPham/Color/ColorView';
import ProductAdd from './pages/Admin/ProductManager/ProductEdit/ProductAdd';
import BrandView from './pages/Admin/ThuocTinhSanPham/Brand/BrandView';
import SizeView from './pages/Admin/ThuocTinhSanPham/Size/SizeView';
import TypeView from './pages/Admin/ThuocTinhSanPham/Type/TypeView';
import BuckleTypeView from './pages/Admin/ThuocTinhSanPham/BuckleType/BuckleTypeView/indexBuckleTypeView';
import CompartmentView from './pages/Admin/ThuocTinhSanPham/Compartment/CompartmentView/indexCompartmentView';
import MaterialView from './pages/Admin/ThuocTinhSanPham/Material/MaterialView';
import ProducerView from './pages/Admin/ThuocTinhSanPham/Producer/ProducerView/indexProducerView';
import VoucherView from './pages/Admin/Voucher/VoucherView';
import StaffView from './pages/Admin/Staff/StaffView';
import SalesCounter from './pages/Admin/SalesManager/SalesCounter';
import CustomerView from './pages/Admin/Customer/CustomerView';
import HoaDonView from './pages/Admin/QuanLyHoaDon/HienThiHoaDon/indexHoaDonView';
import CartView from './pages/Home/Cart';
import Shop from './pages/Home/Shop/shop';
import ShopDetail from './pages/Home/ShopDetail/shopDetail';
import GuestGuard from './api/auth/guard/GuestGuard';
import AuthGuard from './api/auth/guard/StaffAuth';
import UnAuthorPage from './pages/ExceptionPage/UnAuthorPage/UnAuthorPage';
import { getToken, getUserToken } from './api/auth/helper/UserCurrent';
import { Fragment } from 'react';
import RequireAuth from './api/auth/guard/StaffAuth';
import NotFoundPage from './pages/ExceptionPage/UnAuthorPage/NotFoundPage';
import { Switch } from 'antd';
import AdminAuth from './api/auth/guard/AdminAuth';
import StaffAuth from './api/auth/guard/StaffAuth';

const dynamicRoutes = [
  { path: '/admin', component: <Admin />, title: 'Trang chủ', requiredRoles: ['ROLE_ADMIN', 'ROLE_STAFF'] },
  { path: '/product-viewer', component: <ProductViewer />, title: 'Trang sản Phẩm' },
  { path: '/', component: <Home />, title: 'Home' },
  { path: '/unauthor', component: <UnAuthorPage />, title: 'Unauthor' },
  { path: '/product-add', component: <ProductAdd />, title: 'Trang thêm sản phẩm', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/shift-view', component: <ShiftViewer />, title: 'Trang giao ca', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/color-view', component: <ColorView />, title: 'Trang màu sắc', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/brand-view', component: <BrandView />, title: 'Trang thương hiệu', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/size-view', component: <SizeView />, title: 'Trang kích cỡ', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/type-view', component: <TypeView />, title: 'Trang kiểu sản phẩm', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/buckle-type-view', component: <BuckleTypeView />, title: 'Trang kiểu khóa', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/material-view', component: <MaterialView />, title: 'Trang chất liệu', requiredRoles: ['ROLE_ADMIN'] },
  {
    path: '/compartment-view',
    component: <CompartmentView />,
    title: 'Trang kiểu ngăn',
    requiredRoles: ['ROLE_ADMIN'],
  },
  { path: '/producer-view', component: <ProducerView />, title: 'Trang nhà sản xuất', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/voucher-view', component: <VoucherView />, title: 'Trang khuyến mại', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/staff-view', component: <StaffView />, title: 'Trang nhân viên', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/customer-view', component: <CustomerView />, title: 'Trang khách hàng', requiredRoles: ['ROLE_ADMIN'] },
  {
    path: '/sales-counter',
    component: <SalesCounter />,
    title: 'Trang bán hàng',
    requiredRoles: ['ROLE_ADMIN', 'ROLE_STAFF'],
  },
  { path: '/cart', component: <CartView />, title: 'Trang giỏ hàng' },
  {
    path: '/bill-view',
    component: <HoaDonView />,
    title: 'Trang hóa đơn',
    requiredRoles: ['ROLE_ADMIN', 'ROLE_STAFF'],
  },
  { path: '/shop', component: <Shop />, title: 'Trang cửa hàng' },
  { path: '/shop/detail', component: <ShopDetail />, title: 'Trang chi tiết sản phẩm', requiredRoles: ['ROLE_ADMIN'] },
  { path: '/login', component: <Login />, title: 'Trang đăng nhập' },
];

const getTokenAndUserInfo = () => {
  // Lấy token và thông tin người dùng từ Local Storage
  const token = getToken();
  const userInfo = JSON.parse(getUserToken());
  return { token, userInfo };
};
function App() {
  const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    <Route element={<Component {...rest} />} />;
  };
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<UnAuthorPage />} />
          <Route
            path="/admin"
            element={
              <StaffAuth>
                <Admin />
              </StaffAuth>
            }
          />
          <Route
            path="/sales-counter"
            element={
              <StaffAuth>
                <SalesCounter />
              </StaffAuth>
            }
          />
          <Route
            path="/product-viewer"
            element={
              <AdminAuth>
                <ProductViewer />
              </AdminAuth>
            }
          />
          <Route
            path="/product-add"
            element={
              <AdminAuth>
                <ProductAdd />
              </AdminAuth>
            }
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
