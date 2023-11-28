import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';
import TableContent from '../SizeView/Table/Table';

import FormSizeCreate from '../SizeEdit/FormCreate/FormSizeCreate';

const { Header, Footer, Sider, Content } = Layout;

function SizeView() {
  return (
    <Layout style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="14" openKey="sub11" />
      </Sider>
      <Layout className="layoutContent" >
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Kích Cỡ" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>

      </Layout>
    </Layout>
  );
}
export default SizeView;
