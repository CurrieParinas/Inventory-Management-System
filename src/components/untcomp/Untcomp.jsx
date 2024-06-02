import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./unt.scss";
import openbox from "../../assets/open-box2.svg"

const Unt = () => {
    const [untrackedItems, setUntrackedItems] = useState([])
    const navigate = useNavigate();

    const fetchUntrackedItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/inventory/itemMedium/fiveLastModifiedUntracked');
            if (!response.ok) {
                throw new Error('Failed to fetch untracked items');
            }
            const data = await response.json();
            setUntrackedItems(data);
        } catch (error) {
            console.error('Error fetching untracked items:', error);
        }
    };

    useEffect(() => {
        fetchUntrackedItems();
    }, []);

    return (
        <div className='unt'>
            <div className="somediv">
                <img src={openbox} alt="" style={{ 'width': '45px', 'height': '45px' }} />
                <h1>Untracked Items</h1>
            </div>
            <div className="list">
                {untrackedItems.map(item => (
                    <div className="listItem" key={item.ITEM_MEDIUM_ID}>
                        <div className="trackedItemInfo">
                            <div className="itemTexts">
                                <span className="trackedItemName">{item.NAME}</span>
                                <div className="subtext">
                                    <span className="category"><i>{item.DESCRIPTION}, </i></span>
                                    <span className="brand"><i>{item.BRAND}</i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ctaTrackedItem">
                <div className='addTrackedItemButton'>
                    <button onClick={() => navigate('/untrack')}>Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default Unt
