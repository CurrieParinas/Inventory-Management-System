import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

const Card = ({ item, className }) => {
  return (
    <Link to={`/${className}/${item.type}/${item.item_id}`} className="card-container">
        <div className='card'>
            <div className="image">
                <img src={item.img1} alt={`${item.name} cover`} />
            </div>
            <div className="card-words">
                <h2 className="card-name">{item.name}</h2>
                <h3 className="card-desc">{item.description}</h3>
                <h4 className="card-assigned">{item.assigned}</h4>
                <div className="extra-details">
                    <h4>{item.note}</h4>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default Card;
