import "../styles/Product.css";
import { Link } from 'react-router-dom';
import '../styles/Container.css';

function Container({ products, title }) {
    return (
        <div className="container__products">
            <p className="container__title">{title}</p>
            <div className="container__products__row1">
                <Link className="container__link" to={`/products/${products[0]?._id}`}>
                    <img src={products[0]?.image} alt="product__image" />
                </Link>
                <Link className="container__link" to={`/products/${products[1]?._id}`}>
                    <img src={products[1]?.image} alt="product__image" />
                </Link>
            </div>
            <div className="container__products__row2">
                <Link className="container__link" to={`/products/${products[2]?._id}`}>
                    <img src={products[2]?.image} alt="product__image" />
                </Link>
                <Link className="container__link" to={`/products/${products[3]?._id}`}>
                    <img src={products[3]?.image} alt="product__image" />
                </Link>
            </div>
        </div >
    )
}

export default Container