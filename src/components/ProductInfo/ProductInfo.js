import React from 'react';
import { Link } from 'react-router-dom';

import './ProductInfo.css';

const ProductInfo = ({img, title, text, orientation, to}) => {
    
    let content = orientation == "left" ? (
        <>
            <img src={img} />
            <div className="ProductInfoText">
                <h1 className="ProductTitle">{title}</h1>
                <p className="ProductText">{text}</p>
                <Link to={to} className="ProductButton">View</Link>
            </div>
        </>
    ) :

    (
        <>
            <div className="ProductInfoText">
                <h1 className="ProductTitle">{title}</h1>
                <p className="ProductText">{text}</p>
                <Link to={to} className="ProductButton">View</Link>
            </div>
            <img src={img} />
        </>
    );

    return (
        <div className="ProductInfo">
            {content}
        </div>
    )
};

export default ProductInfo;