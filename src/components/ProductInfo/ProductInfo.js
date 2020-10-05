import React from 'react';

import './ProductInfo.css';

const ProductInfo = ({img, title, text, orientation}) => {
    
    let content = orientation == "left" ? (
        <>
            <img src={img} />
            <div className="ProductInfoText">
                <h1 className="ProductTitle">{title}</h1>
                <p className="ProductText">{text}</p>
                <button className="ProductButton">View</button>
            </div>
        </>
    ) :

    (
        <>
            <div className="ProductInfoText">
                <h1 className="ProductTitle">{title}</h1>
                <p className="ProductText">{text}</p>
                <button className="ProductButton">View</button>
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