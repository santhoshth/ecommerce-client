import '../styles/Orders.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { listProduct } from '../redux/actions/ProductActions';
import CheckoutProduct from '../components/CheckoutProduct';
import Footer from '../components/Footer.js';

function SearchProduct() {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            {loading ? <Loading /> : error ? <Error error={error} /> :
                <>
                    <div className="search">
                        <h1>Search result for "{keyword}"</h1>
                        {products.length > 0
                            ?
                            <div className="search__products">
                                {products?.map(product =>
                                    <CheckoutProduct
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        image={product.image}
                                        quantity={product.quantity}
                                        countInStock={product.countInStock}
                                        searchPageButton={true}
                                    />
                                )}
                                {loading && <Loading />}
                                {error && <Error error={error} />}
                            </div>
                            : <h1>No products found</h1>}
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default SearchProduct