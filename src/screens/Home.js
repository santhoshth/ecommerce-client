import React, { useEffect } from 'react';
import Slider from '../components/Slider';
import CarouselSlider from '../components/CarouselSlider';
import '../styles/Home.css';
import { listProduct } from '../redux/actions/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../components/Loading';
import Error from './../components/Error';
import { useParams } from 'react-router-dom';
import Footer from './../components/Footer';
import Container from '../components/Container';

function Home() {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            {loading ? <Loading /> : error ? <Error error={error} />
                :
                <>
                    {products ? <>
                        <div className="slider__container">
                            <Slider />
                        </div>
                        <div className="container__row">
                            <Container title={"Top picks for you"} products={products.filter(p => p.category === "smartphones")} />
                            <Container title={"Best seller in books"} products={products.filter(p => p.category === "books")} />
                            <Container title={"Keep shopping for"} products={products.filter(p => p.category === "others")} />
                            <Container title={"Buy Again"} products={products.filter(p => p.category === "gadgets")} />
                        </div>
                        <div className="carousel__container">
                            <CarouselSlider key={"smartphones"} title={"Mobiles"} products={products.filter(p => p.category === "smartphones")} />
                            <CarouselSlider key={"books"} title={"Books"} products={products.filter(p => p.category === "books")} />
                            <CarouselSlider key={"gadgets"} title={"Gadgets"} products={products.filter(p => p.category === "gadgets")} />
                            <CarouselSlider key={"others"} title={"Keep Shopping"} products={products.filter(p => p.category === "others")} />
                        </div>
                        <Footer />
                    </> : null}
                </>
            }
        </>
    )
}

export default Home;