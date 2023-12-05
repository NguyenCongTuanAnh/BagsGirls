import { Fragment } from 'react';

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
