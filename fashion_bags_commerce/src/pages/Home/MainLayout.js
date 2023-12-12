import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import './index.scss';
import { Fragment, useState } from 'react';

const MainLayout = ({ children }) => {
  return (
    <Fragment className="fullpage">
      <div className="header001">
        <Header />
      </div>
      <div className="page_content">{children}</div>
      <div className="footer_client">
        <Footer />
      </div>
    </Fragment>
  );
};

export default MainLayout;
