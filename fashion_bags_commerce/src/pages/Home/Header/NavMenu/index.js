import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { setTwoToneColor } from '@ant-design/icons';
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
          <Menu.Item key="/">
            <Link to="/" className={styles.submenu}>
              TRANG CHỦ
            </Link>
          </Menu.Item>
          <Menu.Item key="/gioi-thieu">
            <Link to="/gioi-thieu" className={styles.submenu}>
              GIỚI THIỆU
            </Link>
          </Menu.Item>
          <Menu.Item key="/shop">
            <Link to="/shop" className={styles.submenu}>
              SẢN PHẨM
            </Link>
          </Menu.Item>
          <Menu.Item key="/blog">
            <Link to="/blog" className={styles.submenu}>
              BLOG
            </Link>
          </Menu.Item>
          <Menu.Item key="/lien-he">
            <Link to="/lien-he" className={styles.submenu}>
              LIÊN HỆ
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default NavMenu;
