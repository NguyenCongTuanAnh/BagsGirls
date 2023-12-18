import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

function NavMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <div className={styles.navContent}>
      <div className={styles.centeredMenu}>
        <Menu className={styles.menu} mode="horizontal" selectedKeys={selectedKeys} onClick={handleMenuClick}>
          <Menu.Item key="/" className={styles.menuItem}>
            <Link to="/" className={styles.submenu}>
              TRANG CHỦ
            </Link>
          </Menu.Item>
          <Menu.Item key="/gioi-thieu" className={styles.menuItem}>
            <Link to="/gioi-thieu" className={styles.submenu}>
              GIỚI THIỆU
            </Link>
          </Menu.Item>
          <Menu.Item key="/shop" className={styles.menuItem}>
            <Link to="/shop" className={styles.submenu}>
              SẢN PHẨM
            </Link>
          </Menu.Item>
          <Menu.Item key="/blog" className={styles.menuItem}>
            <Link to="/blog" className={styles.submenu}>
              BLOG
            </Link>
          </Menu.Item>
          <Menu.Item key="" className={styles.menuItem}>
            <Link to="" className={styles.submenu}>
              LIÊN HỆ
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default NavMenu;
