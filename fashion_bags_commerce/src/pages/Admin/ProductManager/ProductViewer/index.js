import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';
import TableContent from '../ProductViewer/Table/Table';

const { Header, Footer, Sider, Content } = Layout;

function ProductViewer() {
  return (
    <Layout style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={300} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="11" openKey="sub999" />
      </Sider>
      <Layout className="layoutContent">
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Sản Phẩm" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProductViewer;
