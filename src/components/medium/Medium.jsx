import React, { useEffect, useState } from 'react'
import './medium.scss'
import shelf from "../../assets/shelf.svg"
import { mediumDummy } from '../../sidebar'

const Medium = () => {
    const[mediums, setMediums]=useState([])

    const fetchMediums = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/medium/fiveLastModified');
          if (!response.ok) {
            throw new Error('Failed to fetch mediums');
          }
          const data = await response.json();
          setMediums(data);
        } catch (error) {
          console.error('Error fetching mediums:', error);
        }
      };

    useEffect(() => {
      fetchMediums();
    }, []);

  return (
    <div className='medium'>
        <div className="somediv">
            <img src={shelf} alt="" style={{'width': '45px', 'height': '45px'}} />
            <h1>Medium</h1>
        </div>
        <div className="list">
            {mediums.map(med=>(
                <div className="listItem" key={med.MEDIUM_ID}>
                    <div className="locItemInfo">
                        <div className="itemNumber" style={{minWidth: '16.5px'}}>{med.MEDIUM_ID}</div>
                        <div className="locationTexts">
                            <span className="trackedItemName">{med.NAME} </span>
                            
                        </div>
                    </div>
                    <span className="category"><i>{med.PARENT_LOCATION} </i></span>
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