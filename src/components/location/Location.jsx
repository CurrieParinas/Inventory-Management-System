import React, { useEffect, useState } from 'react'
import "./location.scss"
import locIcon from "../../assets/location.svg"
import { locationDummy } from '../../sidebar'

const Location = () => {
    const[locations, setLocations]=useState([])

    const fetchLocations = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/location/fiveLastModified');
          if (!response.ok) {
            throw new Error('Failed to fetch locations');
          }
          const data = await response.json();
          setLocations(data);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };

    useEffect(() => {
    fetchLocations();
    }, []);

  return (
    <div className='location'>
        <div className="somediv">
            <img src={locIcon} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Location</h1>
        </div>
        <div className="list">
            {locations.map(loc=>(
                <div className="listItem" key={loc.LOCATION_ID}>
                    <div className="locItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{loc.LOCATION_ID}</div>
                        <div className="locationTexts">
                            <span className="trackedItemName">{loc.NAME} </span>
                            
                        </div>
                    </div>
                    <span className="category"><i>{loc.PARENT_LOCATION} </i></span>
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