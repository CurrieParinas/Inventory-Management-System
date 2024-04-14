import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./topbox.scss"
import { trackedItems } from '../../sidebar'
import box from "../../assets/box.svg"

const TopBox = () => {
    const[trackedItems, setTrackedItems]=useState([])

    const fetchTrackedItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/itemMedium/fiveLastModifiedTracked');
          if (!response.ok) {
            throw new Error('Failed to fetch tracked items');
          }
          const data = await response.json();
          setTrackedItems(data);
        } catch (error) {
          console.error('Error fetching tracked items:', error);
        }
      };

    useEffect(() => {
        fetchTrackedItems();
    }, []);

  return (
    <div className='topbox' >
        <div className="somediv">
            <img src={box} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Tracked Items</h1>
        </div>
        <div className="list">
            {trackedItems.map(item=>(
                <div className="listItem" key={item.ITEM_MEDIUM_ID}>
                    <div className="trackedItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{item.ITEM_MEDIUM_ID}</div>
                        <div className="itemTexts">
                            <span className="trackedItemName">{item.itemName}</span>
                            <div className="subtext">
                                <span className="category"><i>{item.category}, </i></span>
                                <span className="brand"><i>{item.brand}</i></span>
                            </div>
                        </div>
                    </div>
                    <span className="amount">{item.quantity} pc(s)</span>
                </div>
            ))}
        </div>
        <div className="ctaTrackedItem">
            <Link to="items" className='toTrackedItemLink'>
                <span className="listItemTitle">View All</span>
            </Link>
            <div className='addTrackedItemButton'>
                <button>Add Item</button>
            </div>
            
        </div>
    </div>
  )
}

export default TopBox