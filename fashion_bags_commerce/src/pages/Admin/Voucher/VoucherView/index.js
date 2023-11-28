import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';

import TableContent from './Table/Table';

const { Header, Footer, Sider, Content } = Layout;
// const headerStyle = {
//   borderLeft: '270px',
//   color: '#fff',
//   height: 'auto',
//   paddingInline: 0,
//   margin: '20px 0 20px 0',

//   backgroundColor: '#f3f4f3',
// };
// const contentStyle = {
//   margin: '0 20px 10px 10px',
//   color: 'black',
//   backgroundColor: 'white',
//   height: '750px',
// };
// const footerStyle = {
//   margin: '0 10px 10px 20px',
//   borderLeft: '270px',
//   color: 'black',
//   backgroundColor: '#fff',
// };
// const layoutContent = {
//   marginLeft: '270px',
//   flexGrow: '1',
//   backgroundColor: '#f3f4f3',
// };

function VoucherView() {
  return (
    <Layout style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="sub6" openKey="sub6" />
      </Sider>
      <Layout className="layoutContent">
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Voucher" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>
      </Layout>
    </Layout>
  );
}

export default VoucherView;
