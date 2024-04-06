import React from 'react'
import "./location.scss"
import locIcon from "../../assets/location.svg"
import { locationDummy } from '../../sidebar'

const Location = () => {
  return (
    <div className='location'>
        <div className="somediv">
            <img src={locIcon} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Location</h1>
        </div>
        <div className="list">
            {locationDummy.map(loc=>(
                <div className="listItem" key={loc.id}>
                    <div className="locItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{loc.id}</div>
                        <div className="locationTexts">
                            <span className="trackedItemName">{loc.locationName} </span>
                            
                        </div>
                    </div>
                    <span className="category"><i>{loc.parentLocation} </i></span>
                </div>
            ))}
        </div>
        <div className="ctaTrackedItem">
            <div className='addTrackedItemButton'>
                <button>Add Location</button>
            </div>
            
        </div>
    </div>
  )
}

export default Location