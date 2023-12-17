import "../styles/Product.css";
import { Link, useNavigate } from 'react-router-dom';
import Rating from "./Rating";
import { numberFormat } from "../NumberFormat";

function Product({ id, title, price, rating, image, numReviews }) {

    const navigate = useNavigate();

    // const addToCart = (e) => {
    //     e.preventDefault();
    //     navigate(`/cart/${id}?quantity=1`);
    //     console.log(`ADDED TO CART --- ${title}`);
    // }

    const toProduct = () => {
        navigate(`/products/${id}`);
        window.scrollTo({ top: 0 });
    }

    return (
        <div className="product" key={id}>
            <img src={image} onClick={toProduct} alt="product__image" />
            <div className="product__info" >
                <Link className="link" to={`/products/${id}`}>
                    <p className="product__title">{title}</p>
                </Link>
                <div className="product__rating">
                    <Rating value={rating} /> <p className="product__title rating__count">{numReviews}</p>
                </div>
                <p className="product__price">
                    <strong>{numberFormat(price)}</strong>
                </p>
            </div>
            {/* <button className="product__button" onClick={addToCart}>Add to Cart</button> */}
        </div >
    )
}

export default Product