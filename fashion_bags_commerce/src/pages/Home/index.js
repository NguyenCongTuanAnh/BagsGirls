import { Layout } from 'antd';
import Content from './Content';
import Footer from './Footer/index';
import Header from './Header/index';

import './index.scss';
import { Fragment, useEffect } from 'react';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <body title="BagGirls">
        <div className="fullpage">
          <div className="header001">
            <Header />
          </div>
          <div className="page_content">
            <Content />
          </div>
          <div className="footer_client">
            <Footer />
          </div>
        </div>
      </body>
    </Fragment>
  );
}

export default Home;
