import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

import "./location.scss"
import locIcon from "../../assets/location2.svg"

const Location = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([])

    const fetchLocations = async () => {
        try {
            const response = await fetch('http://localhost:8080/inventory/location/fiveLastModified');
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }
            const data = await response.json();
            console.log(data)
            setLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className='locationComp'>
            <div className="somediv">
                <img src={locIcon} alt="" style={{ 'width': '45px', 'height': '45px' }} />
                <h1>Location</h1>
            </div>
            <div className="list">
                {locations.map(loc => (
                    <div className="listItem" key={loc.LOCATION_ID}>
                        <div className="locItemInfo">
                            <div className="locationTexts">
                                <span className="trackedItemName">{loc.NAME} </span>
                            </div>
                        </div>
                        {/* {loc.PARENT_LOCATION && (
                            <span className="category"><i>{loc.PARENT_LOCATION.LOCATION_ID} </i></span>
                        )} */}
                    </div>
                ))}
            </div>
            <div className="ctaTrackedItem">
                <div className='addTrackedItemButton'>
                    <button onClick={() => navigate('/locations')}>Add Location</button>
                </div>
            </div>
        </div>
    )
}

export default Location
