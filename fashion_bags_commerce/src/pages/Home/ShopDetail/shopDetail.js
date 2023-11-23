import { Layout } from 'antd';
import Header from '../Header/index';
import Footer from '../Footer/index';
import ShopDetailView from './ShopDetailView/index';
import { Fragment, useEffect } from 'react';
const { Header: HeaderLayout, Footer: FooterLayout, Content: ContentLayout } = Layout;
function ShopDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
      <body>
      <div className="fullpage">
          <div className="header001">
            <Header />
          </div>
          <div className="page_content">
            <ShopDetailView />
          </div>
          <div className="footer_client">
            <Footer />
          </div>
        </div>
      </body>
  );
}

export default ShopDetail;
