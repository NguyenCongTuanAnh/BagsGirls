import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import styles from './index.module.scss';
import TableCart from './TableCart/TableCart';
import { Link } from 'react-router-dom';

const { Header: HeaderLayout, Footer: FooterLayout, Content: ContentLayout } = Layout;

function CartView() {
  return (
    <div>
      <Layout>
        <Header className={styles.header}></Header>
        <div className="duongDan">
          <ul className="ul">
            <span>
              <Link to={'/'}>
                <li className="li">Trang chủ-- </li>
              </Link>

              <Link to={'/cart'}>
                <li className="li">giỏ hàng</li>
              </Link>
            </span>
          </ul>
        </div>
        <ContentLayout className="content">
          <div style={{ textAlign: 'center' }}>
            <h5 className={styles.title}>Hiện chưa có sản phẩm nào trong giỏ hàng của bạn</h5>
            <br></br>
            <Link to={'/shop'} className={styles.continue_cart}>
              <span>Tiếp tục mua sắm...</span>
            </Link>
          </div>
          <TableCart />
        </ContentLayout>

        <FooterLayout>
          <Footer></Footer>
        </FooterLayout>
      </Layout>
    </div>
  );
}

export default CartView;