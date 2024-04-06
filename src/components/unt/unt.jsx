import React from 'react'
import { Link } from "react-router-dom"
import "./unt.scss";
import { untrackedItems } from '../../sidebar'
import openbox from "../../assets/open-box.svg"

const unt = () => {
  return (
    <div className='unt' >
        <div className="somediv">
            <img src={openbox} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Untracked Items</h1>
        </div>
        <div className="list">
            {untrackedItems.map(item=>(
                <div className="listItem" key={item.id}>
                    <div className="trackedItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{item.id}</div>
                        <div className="itemTexts">
                            <span className="trackedItemName">{item.itemName}</span>
                            <div className="subtext">
                                <span className="category"><i>{item.category}, </i></span>
                                <span className="brand"><i>{item.brand}</i></span>
                            </div>
                        </div>
                    </div>
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

export default unt