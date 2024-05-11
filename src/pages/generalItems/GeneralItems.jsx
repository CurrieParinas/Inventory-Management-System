import React, { useEffect, useState } from 'react'
import './generalItem.scss'
import Card from '../../components/card/Card'


const GeneralItems = () => {
  const[items, setItems]=useState([])

    const fetchItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/item/all');
          if (!response.ok) {
            throw new Error('Failed to fetch items');
          }
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItemImage = async (itemId) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/item/showImage/${itemId}`);
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
    <div className='general-item'>
      <div className="generalItemsContainer">
        {items.map((item) => (
            <Card key={item.ITEM_ID} itemId={item.ITEM_ID} item={item} type="generalItem" fetchCodeImage={() => fetchItemImage(item.ITEM_ID)} className="general-items"/>
        ))}
      </div>
    </div>
  )
}

export default GeneralItems