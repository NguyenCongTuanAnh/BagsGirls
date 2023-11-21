import { Fragment } from 'react';

import styles from './index.module.scss';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import NoticeHeader from './NoticeHeader/index';
import MainHeader from './MainHeader/index';
import NavMenu from './NavMenu/index';
function Header() {
  return (
    <Fragment>
      <NoticeHeader />
      <MainHeader />
      <NavMenu />
    </Fragment>
  );
}

export default Header;
