import React, { useState, useEffect } from 'react';
import './barcode.scss';
import Card from '../../components/card/Card'; 
import icon from "../../assets/barcode.svg";

const Barcodes = () => {
  const [items, setItems]=useState([]);
  const [barcodes, setBarcodes] = useState({});

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

  const fetchBarcodes = async () => {
    const barcodePromises = items.map(async (item) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/item/showBar/${item.ITEM_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Barcode');
        }
        const arrayBuffer = await response.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return { itemId: item.ITEM_ID, base64String };
      } catch (error) {
        console.error('Error fetching Barcode:', error);
        return { itemId: item.ITEM_ID, base64String: null };
      }
    });

    const resolvedBarcodes = await Promise.all(barcodePromises);
    const barcodeMap = resolvedBarcodes.reduce((acc, barcode) => {
      acc[barcode.itemId] = barcode.base64String;
      return acc;
    }, {});
    setBarcodes(barcodeMap);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      fetchBarcodes();
    }
  }, [items])

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
                <Card key={item.ITEM_ID} itemId={item.ITEM_ID} item={item} type="barcode" codeImage={barcodes[item.ITEM_ID]} className="barcodes"/>
            ))}
        </div>
    </div>
  );
};

export default Barcodes;
