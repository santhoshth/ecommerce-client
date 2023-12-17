import React from 'react';
import '../styles/Review.css';
import Rating from './Rating';
import moment from 'moment';


function Review({ name, title, comment, rating, date }) {
    return (
        <div className="review__element">
            <p className="name">{name}</p>
            <strong>{title}</strong>
            <p><Rating value={rating} text={`${rating} reviews`} /></p>
            <p className="date">{moment(date).format('Do MMM YYYY')}</p>
            <p>{comment}</p>
        </div>
    )
}

export default Review