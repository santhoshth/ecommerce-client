import React from 'react'
import '../styles/Subtotal.css'
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../NumberFormat';

function Subtotal({ total, itemCount }) {
    const item = itemCount <= 1 ? "item" : "items";

    // useHistory helps us to access the browser history
    // and also push to other pages just like LINK
    // here we have use this instead of LINK beccause, using Link will make the button link like hyperlink
    // so, useHistory object history will be used as event handler
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <div className="subtotal">
            <p className="subtotal__count">
                Subtotal ({`${itemCount} ${item}`}):<strong className="subtotal__total">{` ₹ ${numberFormat(total)}`}</strong>
            </p>
            <small className="subtotal__gift">
                <input type="checkbox" />
                <p> This order contains a gift</p>
            </small>
            <button className="subtotal__button" onClick={checkoutHandler}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal