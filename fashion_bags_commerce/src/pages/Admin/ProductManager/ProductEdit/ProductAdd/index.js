import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Fragment } from 'react';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';
import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import ProductAddForm from './ProductAddForm/ProductAddForm';
import './index.css';
function ProductAdd() {
  const headerStyle = {
    borderLeft: '270px',
    color: '#fff',
    height: 'auto',
    paddingInline: 0,
    lineHeight: '64px',
    backgroundColor: 'white',
    margin: '10px',
  };
  const contentStyle = {
    margin: '0 30px 10px 20px',
    height: '800px',
    color: 'black',
    backgroundColor: 'lightblue',
    borderRadius: '10px',
  };
  const footerStyle = {
    margin: '0 10px 10px 20px',
    borderLeft: '270px',
    color: 'black',
    backgroundColor: 'white',
  };
  const layoutContent = {
    marginLeft: '270px',
    flexGrow: '1',
    backgroundColor: 'white',
  };
  return (
    <Fragment>
      <Layout className="layout" style={{ height: '100%', background: 'white' }}>
        <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
          <Sidebar keyIndex="10" openKey="sub999" />
        </Sider>
        <Layout className="layoutContent">
          <Header className="headerStyle">
            <HeaderContent titlePage="Thêm Sản Phẩm Chi Tiết" />
          </Header>
          <Content className="contentStyle">
            <div>
              <ProductAddForm />
            </div>
            <Footer className="footerStyle">Đây là component của Footer2</Footer>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}

export default ProductAdd;
