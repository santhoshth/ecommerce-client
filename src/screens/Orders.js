import '../styles/Orders.css';
import Order from '../components/Order';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Error from './../components/Error';
import { getOrderDetails, getOrderListDetails } from './../redux/actions/OrderActions';
import { useEffect } from 'react';
import Loading from './../components/Loading';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function Orders() {
    window.scrollTo(0, 0);

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderList = useSelector((state) => state.orderList);
    const { orders, loading: loadingOrders, error: errorOrders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo === null) {
            navigate("/login", { replace: true });
        } else {
            if (id) {
                dispatch(getOrderDetails(id));
            }
            dispatch(getOrderListDetails());
        }
    }, [userInfo, navigate, dispatch, id]);

    return (
        <div className="orders">
            <div className="orders__nav_title">
                {id
                    ?
                    <>
                        {loading ? <Loading /> : error ? <Error error={error} /> :
                            <>
                                <p className="profile__title">Order Details</p>
                                <Order
                                    items={order?.orderItems}
                                    totalPrice={order?.totalPrice}
                                    createdAt={order?.createdAt}
                                    id={order?._id}
                                    shippingAddress={order?.shippingAddress}
                                />
                            </>}
                    </>
                    :
                    <>
                        {loadingOrders ? <Loading /> : errorOrders ? <Error error={errorOrders} /> :
                            <>
                                <div className="profile__nav">
                                    <Link style={{ textDecoration: 'none' }} to="/account">
                                        <p className="profile__account">Your Account</p>
                                    </Link>
                                    <ArrowRightIcon className="arrow__icon" fontSize='small' />
                                    <span>Orders</span>
                                </div>
                                <p className="profile__title">Your Orders ({orders?.length})</p>
                                {orders?.length > 0
                                    ? <>
                                        {orders?.map(order =>
                                            <Order
                                                key={order?._id}
                                                items={order?.orderItems}
                                                totalPrice={order?.totalPrice}
                                                createdAt={order?.createdAt}
                                                id={order?._id}
                                                shippingAddress={order?.shippingAddress} />
                                        )}
                                    </> :
                                    <Link to="/" className="link">
                                        <p className="profile__title">No Orders Placed. Shop Now</p>
                                    </Link>
                                }
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Orders