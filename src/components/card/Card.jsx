import React, { useEffect, useState } from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

const Card = ({ itemId, item, type, fetchCodeImage, className }) => {
    const [codeImageUrl, setCodeImageUrl] = useState(null);

    const fetchImage = async () => {
        const imageUrl = await fetchCodeImage(itemId);
        setCodeImageUrl(imageUrl);
    };
    
    useEffect(() => {   
        fetchImage();
    });

  return (
    <Link to={`/${className}/${type}/${itemId}`} className="card-container">
        <div className='card'>
            <div className="image">
                <img src={codeImageUrl} alt={`${item.NAME} cover`} />
            </div>
            <div className="card-words">
                <h2 className="card-name">{item.NAME}</h2>
                <h4 className="card-desc">{item.DESCRIPTION}</h4>
            </div>
        </div>
    </Link>
  );
};

export default Card;
