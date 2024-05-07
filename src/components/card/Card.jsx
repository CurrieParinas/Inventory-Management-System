import React, { useEffect, useState } from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

const Card = ({ item, type, fetchCodeImage, className }) => {
    const [codeImageUrl, setCodeImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
        const imageUrl = await fetchCodeImage(item.ITEM_ID);
        setCodeImageUrl(imageUrl);
        };
        fetchImage();
    }, [fetchCodeImage, item.ITEM_ID]);

  return (
    <Link to={`/${className}/${type}/${item.ITEM_ID}`} className="card-container">
        <div className='card'>
            <div className="image">
                <img src={codeImageUrl} alt={`${item.NAME} cover`} />
            </div>
            <div className="card-words">
                <h2 className="card-name">{item.NAME}</h2>
                <h3 className="card-desc">{item.DESCRIPTION}</h3>
                {/* <h4 className="card-assigned">{item.assigned}</h4>  
                <div className="extra-details">
                    <h4>{item.note}</h4>
                </div> */}
            </div>
        </div>
    </Link>
  );
};

export default Card;
