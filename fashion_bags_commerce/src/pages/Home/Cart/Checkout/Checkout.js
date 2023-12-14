import CheckoutDetail from '~/pages/Home/Cart/Checkout/FormCheckoutDetail/CheckoutDetail';
import Header from '../../Header';
function Checkout() {


  return (
    <div className="checkout">
      <Header />
      <br></br>
      <div>
        <div className="page_content">
            <CheckoutDetail />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
