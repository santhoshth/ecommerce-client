import '../styles/Checkout.css';
import Subtotal from '../components/Subtotal';
import CheckoutProduct from '../components/CheckoutProduct';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../redux/actions/CartActions';

const Checkout = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    const productId = params.id;
    const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const cartItemsCount = cartItems.length === 0 ? 0 : cartItems.reduce((total, i) => total + i.quantity, 0);
    const cartItemsTotal = cartItems.length === 0 ? 0 : cartItems.reduce((total, i) => total + i.subTotal, 0).toFixed(2);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    return (
        <>
            <div className="checkout">
                <div className="checkout__left">
                    <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt='checkout__ad' />
                    <div>
                        {cartItems?.length === 0
                            ?
                            <Link to="/" className="link">
                                <h2 className="checkout__title">
                                    Your cart is empty. Shop Now
                                </h2>
                            </Link>
                            :
                            <>
                                <div className="checkout__title">
                                    <h2>Shopping Cart</h2>
                                    <h2>Price</h2>
                                </div>
                                {cartItems?.map((cartItem) =>
                                    <CheckoutProduct
                                        key={cartItem.product}
                                        id={cartItem.product}
                                        title={cartItem.title}
                                        price={cartItem.price}
                                        image={cartItem.image}
                                        subTotal={cartItem.subTotal}
                                        quantity={cartItem.quantity}
                                        countInStock={cartItem.countInStock}
                                    />
                                )}
                            </>
                        }
                    </div>
                </div>
                <div className="checkout__right">
                    {cartItems.length > 0 ? <Subtotal total={cartItemsTotal} itemCount={cartItemsCount} /> : <></>}
                </div>
            </div>
        </>
    )
}

export default Checkout