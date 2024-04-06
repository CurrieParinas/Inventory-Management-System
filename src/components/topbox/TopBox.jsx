import React from 'react'
import { Link } from "react-router-dom"
import "./topbox.scss"
import { trackedItems } from '../../sidebar'
import box from "../../assets/box.svg"

const TopBox = () => {
  return (
    <div className='topbox' >
        <div className="somediv">
            <img src={box} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Tracked Items</h1>
        </div>
        <div className="list">
            {trackedItems.map(item=>(
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