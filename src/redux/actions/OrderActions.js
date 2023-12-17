import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from './../constants/OrderConstants';
import { CART_CLEAR_ITEMS } from './../constants/CartConstants';
import { logout } from './UserActions';
import URL from '../../Url';

// CREATE ORDER
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        };

        const { data } = await axios.post(`${URL}/api/orders`, order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR_ITEMS, payload: data });

        localStorage.removeItem("cartItems");

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    }
}

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        };

        const { data } = await axios.get(`${URL}/api/orders/${id}`, config);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
}

// USER ORDER LIST
export const getOrderListDetails = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        };

        const { data } = await axios.get(`${URL}/api/orders`, config);

        const filterOrders =
            data
                .filter((order) => order.user === userInfo._id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        dispatch({ type: ORDER_LIST_SUCCESS, payload: filterOrders });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
}

