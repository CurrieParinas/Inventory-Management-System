import React from 'react'
import './medium.scss'
import shelf from "../../assets/shelf.svg"
import { mediumDummy } from '../../sidebar'

const Medium = () => {
  return (
    <div className='medium'>
        <div className="somediv">
            <img src={shelf} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Medium</h1>
        </div>
        <div className="list">
            {mediumDummy.map(med=>(
                <div className="listItem" key={med.id}>
                    <div className="locItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{med.id}</div>
                        <div className="locationTexts">
                            <span className="trackedItemName">{med.locationName} </span>
                            
                        </div>
                    </div>
                    <span className="category"><i>{med.parentLocation} </i></span>
                </div>
            ))}
        </div>
        <div className="ctaTrackedItem">
            <div className='addTrackedItemButton'>
                <button>Add Medium</button>
            </div>
            
        </div>
    </div>
  )
}

export default Medium