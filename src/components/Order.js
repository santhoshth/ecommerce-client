import moment from 'moment';
import '../styles/Order.css';
import CheckoutProduct from './CheckoutProduct';
import { numberFormat } from '../NumberFormat';
import ReactHover, { Hover, Trigger } from 'react-hover';
import { Link } from 'react-router-dom';

function Order({ items, totalPrice, createdAt, id, shippingAddress }) {

    const options = {
        followCursor: false,
        shiftX: 20,
        shiftY: 0,
    }

    return (
        <div className="order">
            <div className="order__header">
                <div className="order__header__left">
                    <div className="order__date">
                        ORDER PLACED:
                        <p>{moment(createdAt).format("DD MMMM YYYY")}</p>
                    </div>
                    <div className="order__total">
                        TOTAL
                        <p><small>₹ </small>{numberFormat(totalPrice)}</p>
                    </div>
                    <div className="order__ship">
                        SHIP TO:
                        <ReactHover options={options}>
                            <Trigger type="trigger">
                                <p className="order__shipTo__name">{shippingAddress?.name}</p>
                            </Trigger>
                            <Hover type="hover">
                                <div className="hover__data">
                                    <p style={{ fontWeight: "700" }}>{shippingAddress?.name}</p>
                                    <p>{shippingAddress?.address}</p>
                                    <p>{shippingAddress?.city}</p>
                                    <p>{shippingAddress?.pincode}</p>
                                    <p>{shippingAddress?.country}</p>
                                </div>
                            </Hover>
                        </ReactHover>
                    </div>
                </div>
                <div className="order__header__right">
                    <Link style={{ textDecoration: 'none' }} to={`/orders/${id}`}>
                        <p className="order__id">
                            ORDER #
                            <small className="order__id__color">{id}</small>
                        </p>
                    </Link>
                </div>
            </div>
            <div className="order__items">
                {items?.map(item => (
                    <CheckoutProduct
                        key={item.product}
                        id={item.product}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        orderPageButton={true}
                        subTotal={item.price * item.quantity}
                        quantity={item.quantity}
                    />
                ))}
            </div>
        </div>
    )
}

export default Order