import React, { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"
import './medium.scss'
import shelf from "../../assets/shelf2.svg"

const Medium = () => {
    const navigate = useNavigate();
    const [mediums, setMediums] = useState([])

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
        <div className='mediumComp'>
            <div className="somediv">
                <img src={shelf} alt="" style={{ 'width': '45px', 'height': '45px' }} />
                <h1>Medium</h1>
            </div>
            <div className="list">
                {mediums.map(med => (
                    <div className="listItem" key={med.MEDIUM_ID}>
                        <div className="locItemInfo">
                            <div className="locationTexts">
                                <span className="trackedItemName">{med.NAME} </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="ctaTrackedItem">
                <div className='addTrackedItemButton'>
                <button onClick={() => navigate('/mediums')}>Add Medium</button>
                </div>
            </div>
        </div>
    )
}

export default Medium
