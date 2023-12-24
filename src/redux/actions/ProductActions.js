import axios from "axios"
import URL from "../../Url";
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/ProductConstants"
import { PRODUCT_DETAILS_SUCCESS } from './../constants/ProductConstants';
import { logout } from "./UserActions";

// FETCH PRODUCT LIST
export const listProduct = (keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get(`${URL}/api/products?keyword=${keyword}`);

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch(({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        }));
    }
}

// FETCH SINGLE PRODUCT DETAILS
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`${URL}/api/products/${id}`);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch(({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        }));
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        };

        await axios.post(
            `${URL}/api/products/${productId}/review`,
            review,
            config,
        );

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        });
    }
}
