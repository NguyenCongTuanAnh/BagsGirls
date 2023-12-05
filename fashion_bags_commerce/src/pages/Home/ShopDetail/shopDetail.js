import { Layout } from 'antd';
import Header from '../Header/index';
import Footer from '../Footer/index';
import ShopDetailView from './ShopDetailView/index';
import { Fragment, useEffect } from 'react';
function ShopDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
      <Fragment>
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
      </Fragment>
  );
}

export default ShopDetail;
