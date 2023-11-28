import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar/index';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header/index';
import TableContent from './Table/Table';
const { Header, Footer, Sider, Content } = Layout;


function MaterialView() {
  return (
    <Layout style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="15" openKey="sub11" />
      </Sider>
      <Layout className="layoutContent" >
      <Header className="headerStyle" style={{ background: 'lightcyan' }}>

          <HeaderContent titlePage="Danh Sách Chất Liệu" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>

      </Layout>
    </Layout>
  );
}

export default MaterialView;
