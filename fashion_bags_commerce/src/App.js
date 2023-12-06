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
import HoaDonOnlineView from './pages/Admin/QuanLyHoaDon/HienThiHoaDon/indexHoaDonView';
import Shop from './pages/Home/Shop/shop';
import ShopDetail from './pages/Home/ShopDetail/shopDetail';
import UnAuthorPage from './pages/ExceptionPage/UnAuthorPage/UnAuthorPage';
import { Fragment } from 'react';
import NotFoundPage from './pages/ExceptionPage/UnAuthorPage/NotFoundPage';
import { QRCode, Switch } from 'antd';
import AdminAuth from './api/auth/guard/AdminAuth';
import StaffAuth from './api/auth/guard/StaffAuth';
import ShopView from './pages/Home/Shop/ShopView';
import { Content } from 'antd/es/layout/layout';
import CartView from './pages/Home/Cart/cart';
import Checkout from './pages/Home/Cart/Checkout/Checkout';
import LoginForm from './pages/Login/FormLogin/FormLogin/LoginForm';
import RegisterForm from './pages/Login/FormLogin/FormRegister/RegisterForm';
import ProductDetailsViewerPage from './pages/Admin/ProductManager/ProductDetailsViewer';
import QRCodeScanner from './component/GlobalStyles/layouts/DefaultLayout/QRCode/QRCode';

import PrintTableComponent from './component/GlobalStyles/layouts/DefaultLayout/PrintTableComponent/PrintProduct';

import AboutPage from './pages/Home/GioiThieu';
import BlogPage from './pages/Home/Blog';
import HoaDonTaiQuayView from './pages/Admin/QuanLyHoaDon/HoaDonTaiQuay/indexHoaDonTaiQuayView';
import LoginFormStaff from './pages/Login/FormLogin/FormLoginStaff/LoginFormStaff';

// const dynamicRoutes = [
//   { path: '/product-viewer', component: <ProductViewer />, title: 'Trang sản Phẩm' },
//   { path: '/', component: <Home />, title: 'Home' },
//   { path: '/unauthor', component: <UnAuthorPage />, title: 'Unauthor' },
//   { path: '/product-add', component: <ProductAdd />, title: 'Trang thêm sản phẩm', requiredRoles: ['ROLE_ADMIN'] },
//   { path: '/type-view', component: <TypeView />, title: 'Trang kiểu sản phẩm', requiredRoles: ['ROLE_ADMIN'] },
//   {
//     path: '/compartment-view',
//     component: <CompartmentView />,
//     title: 'Trang kiểu ngăn',
//     requiredRoles: ['ROLE_ADMIN'],
//   },
//   { path: '/producer-view', component: <ProducerView />, title: 'Trang nhà sản xuất', requiredRoles: ['ROLE_ADMIN'] },
//   { path: '/voucher-view', component: <VoucherView />, title: 'Trang khuyến mại', requiredRoles: ['ROLE_ADMIN'] },
//   { path: '/staff-view', component: <StaffView />, title: 'Trang nhân viên', requiredRoles: ['ROLE_ADMIN'] },
//   { path: '/customer-view', component: <CustomerView />, title: 'Trang khách hàng', requiredRoles: ['ROLE_ADMIN'] },
//   {
//     path: '/sales-counter',
//     component: <SalesCounter />,
//     title: 'Trang bán hàng',
//     requiredRoles: ['ROLE_ADMIN', 'ROLE_STAFF'],
//   },
//   {
//     path: '/bill-view',
//     component: <HoaDonOnlineView />,
//     title: 'Trang hóa đơn',
//     requiredRoles: ['ROLE_ADMIN', 'ROLE_STAFF'],
//   },
// ];

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<LoginFormStaff />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/detail/:productId" element={<ShopDetail />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/unauthorized" element={<UnAuthorPage />} />
          <Route path="/print-table" element={<PrintTableComponent />} />

          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />

          <Route
            path="/bill-offline-view"
            element={
              <AdminAuth>
                <HoaDonTaiQuayView />
              </AdminAuth>
            }
          />

          <Route
            path="/bill-online-view"
            element={
              <AdminAuth>
                <HoaDonOnlineView />
              </AdminAuth>
            }
          />

          <Route
            path="/shift-view"
            element={
              <AdminAuth>
                <ShiftViewer />
              </AdminAuth>
            }
          />

          <Route
            path="/admin"
            element={
              <StaffAuth>
                <Admin />
              </StaffAuth>
            }
          />

          <Route
            path="/customer-view"
            element={
              <AdminAuth>
                <CustomerView />
              </AdminAuth>
            }
          />

          <Route
            path="/view-productDetails"
            element={
              <AdminAuth>
                <ProductDetailsViewerPage />
              </AdminAuth>
            }
          />

          <Route
            path="/voucher-view"
            element={
              <AdminAuth>
                <VoucherView />
              </AdminAuth>
            }
          />

          <Route
            path="/color-view"
            element={
              <AdminAuth>
                <ColorView />
              </AdminAuth>
            }
          />

          <Route
            path="/material-view"
            element={
              <AdminAuth>
                <MaterialView />
              </AdminAuth>
            }
          />

          <Route
            path="/brand-view"
            element={
              <AdminAuth>
                <BrandView />
              </AdminAuth>
            }
          />

          <Route
            path="/size-view"
            element={
              <AdminAuth>
                <SizeView />
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

          <Route
            path="/compartment-view"
            element={
              <AdminAuth>
                <CompartmentView />
              </AdminAuth>
            }
          />

          <Route
            path="/type-view"
            element={
              <AdminAuth>
                <TypeView />
              </AdminAuth>
            }
          />

          <Route
            path="/producer-view"
            element={
              <AdminAuth>
                <ProducerView />
              </AdminAuth>
            }
          />

          <Route
            path="/buckle-type-view"
            element={
              <AdminAuth>
                <BuckleTypeView />
              </AdminAuth>
            }
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
