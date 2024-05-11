import React, { useEffect, useState } from 'react'
import './medium.scss'
import Card from '../../components/card/Card'

const Medium = () => {
  const[mediums, setMediums]=useState([])

    const fetchMediums = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/medium/all');
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

    const fetchMediumImage = async (mediumId) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/showImage/${mediumId}`);
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
    <div className='medium'>
      <div className="mediumcontainer">
        {mediums.map((item) => (
            <Card key={item.MEDIUM_ID} item={item} type="medium" fetchCodeImage={fetchMediums} className="mediums"/>
        ))}
      </div>
    </div>
  )
}

export default Medium