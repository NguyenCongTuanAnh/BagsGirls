import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar/index';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header/index';
import TableContent from './TableCompartment/TableCompartment';

const { Header, Footer, Sider, Content } = Layout;

function CompartmentView() {
  return (
    <div style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={300} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="18" openKey="sub11" />
      </Sider>
      <Layout className="layoutContent" >
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Kiểu Ngăn" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>

      </Layout>
    </div>
  );
}

export default CompartmentView;
