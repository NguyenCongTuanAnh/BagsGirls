import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';
import './admin.scss';
const { Header, Footer, Sider, Content } = Layout;

function Admin() {
  return (
    <Layout style={{ height: '100%', background: 'white' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="sub1" openKey="sub1" />
      </Sider>
      <Layout className="layoutContent">
        <Header className="headerStyle">
          <HeaderContent titlePage="Trang quản trị" />
        </Header>

        <Content className="contentStyle"></Content>

        {/* <Footer style={footerStyle}>Đây là component của Footer</Footer> */}
      </Layout>
    </Layout>
  );
}

export default Admin;
