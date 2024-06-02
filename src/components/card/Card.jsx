import React, { useEffect, useState } from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const convertToBase64 = (byteArray) => {
        return `data:image/jpeg;base64,${byteArray}`;
    };

    const CardContent = (
        <div className='card'>
            <div className="image">
                {props.codeImage ? (
                    <img
                        src={convertToBase64(props.codeImage)}
                        alt={`${props.item.NAME} cover`}
                    />
                ) : (
                    <img src={convertToBase64(props.item.IMAGE)} alt={`${props.item.NAME} cover`} />
                )}
            </div>
            <div className="card-words">
                <h2 className="card-name">{props.item.NAME}</h2>
                <h4 className="card-desc">{props.item.DESCRIPTION}</h4>
            </div>
        </div>
    );

    return (props.className === 'barcodes'|| props.className === 'qrcodes') ? (
        <div className="card-container">
            {CardContent}
        </div>
    ) : (
        <Link to={`/${props.className}/${props.type}/${props.itemId}`} className="card-container">
            {CardContent}
        </Link>
    );
};

export default Card;
