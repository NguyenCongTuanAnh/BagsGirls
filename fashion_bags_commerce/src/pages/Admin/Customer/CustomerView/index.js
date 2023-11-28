import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';

import TableContent from './Table/Table';
import FormCustomerCreate from '../CustomerEdit/FormCreate/FormCustomerCreate';
import FormCustomerCreate1 from '../CustomerEdit/FormCreate/FormCustomerCreate';

const { Header, Footer, Sider, Content } = Layout;

function CustomerView() {
  return (
    <Layout style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="sub8" openKey="sub8" />
      </Sider>
      <Layout className="layoutContent">
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Khách Hàng" />
        </Header>
        <Content className="contentStyle">
          <TableContent style={{ boder: 'black solid 1px' }} />
        </Content>

        {/* <Footer className="footerStyle">Đây là component của Footer</Footer> */}
      </Layout>
    </Layout>
  );
}
export default CustomerView;
