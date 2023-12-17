import React from 'react';
import '../styles/Slider.css';
import { Slide } from 'react-slideshow-image';

function Slider() {

    const slideImages = [
        "https://m.media-amazon.com/images/I/814hjC9rRAL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61s37wsx7OL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61GIn7vmOkL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/614f4EspZwL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/614ZuwNZ4eL._SX3000_.jpg"
    ];

    return (
        <div className="slider">
            <Slide easing="ease" duration={10000} transitionDuration={250} canSwipe={false}>
                <div className="each-slide">
                    <div className="slider-div">
                        <img className="slider-img" src={slideImages[0]} alt="slider__img" />
                    </div>
                </div>
                <div className="each-slide">
                    <div className="slider-div">
                        <img className="slider-img" src={slideImages[1]} alt="slider__img" />
                    </div>
                </div>
                <div className="each-slide">
                    <div className="slider-div">
                        <img className="slider-img" src={slideImages[2]} alt="slider__img" />
                    </div>
                </div>
                <div className="each-slide">
                    <div className="slider-div">
                        <img className="slider-img" src={slideImages[3]} alt="slider__img" />
                    </div>
                </div>
                <div className="each-slide">
                    <div className="slider-div">
                        <img className="slider-img" src={slideImages[4]} alt="slider__img" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slider