import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { numberFormat } from '../NumberFormat';
import { addToCart, removeFromCart } from '../redux/actions/CartActions';
import '../styles/CheckoutProduct.css';

function CheckoutProduct({ id, title, price, image, orderPageButton, paymentPageButton, subTotal, quantity, countInStock, searchPageButton }) {
    const dispatch = useDispatch();

    const [searchPageQty, setSearchPageQty] = useState(1);

    const buttonType = orderPageButton ? "Buy it again" : searchPageButton ? "Add to Cart" : "Delete";

    const addToCartHandler = () => {
        dispatch(addToCart(id, Number(searchPageQty)));
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart(id));
    }

    const buttonHandle = orderPageButton || searchPageButton ? addToCartHandler : removeFromCartHandler;

    const onChangeHandle = (e) => {
        if (searchPageButton) {
            setSearchPageQty(e.target.value);
        } else {
            dispatch(addToCart(id, Number(e.target.value)));
        }
    }

    return (
        <>
            <div className="checkoutProduct">
                <img className="checkoutProduct__image" src={image} alt="checkoutProduct__image" />
                <div className="checkoutProduct__info">
                    <p className="checkoutProduct__title">
                        <Link className="link" to={`/products/${id}`}>
                            {title}
                        </Link>
                    </p>
                    <p className="checkoutProduct__price">
                        <strong>{numberFormat(price)}</strong>
                    </p>
                    <div className="checkoutProduct__quantity">
                        <p><strong>Quantity</strong></p>
                        {orderPageButton || paymentPageButton
                            ? <>
                                <strong>{`: ${quantity}`}</strong>
                            </>
                            :
                            <select
                                value={quantity}
                                onChange={(e) => onChangeHandle(e)}
                            >
                                {[...Array(countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>}
                    </div>
                    {!paymentPageButton ? (
                        <button className="checkoutProduct__button" onClick={buttonHandle}>{buttonType}</button>
                    ) : null}
                </div>
                {searchPageButton ? null : (
                    <div className="checkoutProduct__subtotal">
                        <strong>{numberFormat(subTotal)}</strong>
                    </div>
                )}
            </div>
        </>
    )
}

export default CheckoutProduct