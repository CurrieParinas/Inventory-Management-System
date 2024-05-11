import React, { useEffect, useState } from 'react'
import './location.scss'
import Card from '../../components/card/Card'

const Location = () => {
  const[locations, setLocations]=useState([])

    const fetchLocations = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/location/all');
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

    const fetchLocationImage = async (locationId) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/location/showImage/${locationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageData = await response.blob();
        return URL.createObjectURL(imageData);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  return (
    <div className='location'>
      <div className="locationcontainer">
        {locations.map((item) => (
            <Card key={item.LOCATION_ID} item={item} type="location" fetchCodeImage={fetchLocations} className="locations"/>
        ))}
      </div>
    </div>
  )
}

export default Location