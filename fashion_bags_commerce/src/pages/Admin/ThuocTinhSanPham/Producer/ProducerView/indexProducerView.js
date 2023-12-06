import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header';
import TableContent from '../ProducerView/TableProducer/TableProducer';
import FormCreateProducer from '../ProducerEdit/FormCreateProducer/FormCreateProduer';

const { Header, Footer, Sider, Content } = Layout;

function ProducerView() {
  return (
    <div style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={260} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="19" openKey="sub11" />
      </Sider>
      <Layout className="layoutContent" >
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Nhà Sản Xuất" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>

      </Layout>
    </div>
  );
}
export default ProducerView;
