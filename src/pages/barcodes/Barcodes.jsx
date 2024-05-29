import React, { useState, useEffect } from 'react';
import './barcode.scss';
import Card from '../../components/card/Card'; 
import icon from "../../assets/barcode.svg";

const Barcodes = () => {
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

  const fetchBarcode = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/item/showBar/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Barcode');
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching Barcode:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='barcode'>
        <div className="info">
            <div className="textdiv">
                <img src={icon} alt="" style={{ width: '45px', height: '45px' }} />
                <h1 style={{ marginLeft: "-10px" }}>Barcodes</h1>
            </div>
        </div>
        <div className="barcodecontainer">
            {items.map((item) => (
                <Card key={item.ITEM_ID} itemId={item.ITEM_ID} item={item} type="barcode" fetchCodeImage={fetchBarcode} className="barcodes"/>
            ))}
        </div>
    </div>
  );
};

export default Barcodes;
