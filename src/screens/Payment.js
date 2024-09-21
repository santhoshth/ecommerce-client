import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Payment.css'
import CheckoutProduct from '../components/CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_CREATE_RESET } from '../redux/constants/OrderConstants';
import { createOrder } from './../redux/actions/OrderActions';
import Error from './../components/Error';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import URL from '../Url';

function Payment() {
    // payment related stuff
    const stripe = useStripe();
    const elements = useElements();

    const [payError, setPayError] = useState(null);
    const [payDisabled, setPayDisabled] = useState(true);
    const [payProcessing, setPayProcessing] = useState(false);
    const [paySucceeded, setPaySucceeded] = useState(false);

    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cartTotalPrice = cartItems?.reduce((total, item) => total + item.subTotal, 0);
    const cartTotalQuantiy = cartItems?.reduce((total, item) => total + item.quantity, 0);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (userInfo === null) {
            navigate("/login", { replace: true });
        } else {
            // generate the special stripe secret which allows us to charge a customer
            if (cartTotalPrice > 0) {
                const getClientSecret = async () => {
                    const { data } = await axios.post(`${URL}/api/payments/create?total=${cartTotalPrice * 100}`);
                    setClientSecret(data.clientSecret);
                }
                getClientSecret();
            }

            if (success) {
                navigate(`/orders/${order._id}`, { replace: true });
                dispatch({ type: ORDER_CREATE_RESET })
            }
        }
    }, [userInfo, cartTotalPrice, navigate, dispatch, success, order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPayProcessing(true);

        // eslint-disable-next-line
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent means payment confirmation

            setPaySucceeded(true);
            setPayError(null);
            setPayProcessing(false);

            dispatch(createOrder({
                user: userInfo,
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                totalPrice: cartTotalPrice,
                paymentIntent: paymentIntent,
            }));
        })
    }

    const handleChange = (e) => {
        // listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setPayDisabled(e.empty);
        setPayError(e.error ? e.error.message : "");
    }

    return (
        <>
            <div className="payment">
                <div className="payment__container">
                    <h2>Checkout (<Link to={'/cart'}>{cartTotalQuantiy}</Link>)</h2>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__content">
                            <p>{shippingAddress?.name}</p>
                            <p>{shippingAddress?.address}</p>
                            <p>{shippingAddress?.city}</p>
                            <p>{shippingAddress?.pincode}</p>
                            <p>{shippingAddress?.country}</p>
                        </div>
                    </div>

                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review Items and Delivery</h3>
                        </div>
                        <div className="payment__content">
                            {cartItems?.map((cartItem) => (
                                <CheckoutProduct
                                    key={cartItem?.product}
                                    id={cartItem?.product}
                                    title={cartItem?.title}
                                    price={cartItem?.price}
                                    subTotal={cartItem?.subTotal}
                                    image={cartItem?.image}
                                    quantity={cartItem?.quantity}
                                    countInStock={cartItem?.countInStock}
                                    paymentPageButton={true}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="payment__card__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <h4>Card Details</h4>
                            <form onSubmit={handleSubmit}>
                                <CardElement className="payment__card" onChange={handleChange} />
                                <div className="payment__total">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={cartTotalPrice}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={" ₹ "}
                                    />
                                    <button disabled={payProcessing || payDisabled || paySucceeded || cartItems?.length === 0}>
                                        <span>{payProcessing ? "Processing..." : "Buy Now"}</span>
                                    </button>
                                </div>
                                {error ? <Error error={error} /> : null}
                                {payError ? <Error error={payError} /> : null}
                            </form>
                        </div>
                        <div className="payment__additional__info">
                            <h5>Stripe Payment Integration</h5>
                            <h5>Currently set in Test Mode</h5>
                            <h5>(Can be switched to Live Mode for real transactions)</h5>
                            <h5>Please use the following card details:</h5>
                            <p>Card Number: 4242 4242 4242 4242</p>
                            <p>Expiry Date: Any future date (e.g., 12/25)</p>
                            <p> CVC: Any 3 digits (e.g., 123)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment