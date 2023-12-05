import { Fragment } from 'react';
import LayoutCarousel from './LayoutCarousel';
import ShopView from '../Shop/ShopView/index';
import ProductList from './ProductList/ProductList';
import ExtendContent from './ExtendContent';

function Content() {
  return (
    <Fragment>
      <LayoutCarousel />
      <ShopView titleContent={'SẢN PHẨM BÁN CHẠY'} />
      <ProductList titleContent={'SẢN PHẨM KHUYẾN MÃI'} />
      <ExtendContent titleContent={'EVENT/TÀI TRỢ'} />
    </Fragment>
  );
}

export default Content;
