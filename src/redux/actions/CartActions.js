import axios from "axios"
import URL from "../../Url";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/CartConstants"

export const addToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`${URL}/api/products/${id}`);

    const totalPriceOfProduct = data.price * quantity;

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            title: data.title,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            subTotal: totalPriceOfProduct,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
}