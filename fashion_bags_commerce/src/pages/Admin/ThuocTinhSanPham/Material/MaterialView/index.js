import Sidebar from '~/component/GlobalStyles/layouts/DefaultLayout/SideBar/index';
import { Layout } from 'antd';
import HeaderContent from '~/component/GlobalStyles/layouts/DefaultLayout/Header/index';
import TableContent from './Table/Table';
import { Fragment } from 'react';
const { Header, Footer, Sider, Content } = Layout;


function MaterialView() {
  return (
    <div style={{ height: '100%', background: '#f4f3f4' }}>
      <Sider width={300} style={{ background: '#fff', zIndex: '999', position: 'fixed', overflowY: 'auto' }}>
        <Sidebar keyIndex="15" openKey="sub11" />
      </Sider>
      <div className="layoutContent" >
        <Header className="headerStyle">
          <HeaderContent titlePage="Danh Sách Chất Liệu" />
        </Header>
        <Content className="contentStyle">
          <TableContent />
        </Content>

      </div>
    </div>
  );
}

export default MaterialView;
