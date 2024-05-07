import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card'; 
import './qrcodes.scss'

function Qrcodes() {
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

  const fetchQRCode = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/item/showQR/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch QR code');
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
    
  return (
    <div className='qrcode'>
        <div className="qrcodecontainer">
        {items.map((item) => (
            { ...items, id: item.ITEM_ID },
            <Card key={item.ITEM_ID} item={item} type="qrcode" fetchCodeImage={fetchQRCode} className="qrcodes"/>
        ))}
        </div>
    </div>
  )
}

export default Qrcodes