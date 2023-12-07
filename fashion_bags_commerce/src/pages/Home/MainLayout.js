import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import './index.scss';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  return (
    <Layout className="fullpages">
      <div className="header001">
        <Header />
      </div>
      <div className="page_content">{children}</div>
      <div className="footer_client">
        <Footer />
      </div>
    </Layout>
  );
};

export default MainLayout;