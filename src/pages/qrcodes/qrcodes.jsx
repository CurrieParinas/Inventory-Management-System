import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card'; 
import './qrcodes.scss'
import icon from '../../assets/qr-code.svg'

function Qrcodes() {
  const [items, setItems]=useState([])
  const [mediums, setMediums]=useState([])
  const [itemqrcodes, setItemQRcodes] = useState({});
  const [mediumqrcodes, setMediumQRcodes] = useState({});

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

  const fetchItemQRcodes = async () => {
    const qrcodePromises = items.map(async (item) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/item/showQR/${item.ITEM_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
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
        console.error('Error fetching QR code:', error);
        return { itemId: item.ITEM_ID, base64String: null };
      }
    });

    const resolvedQRcodes = await Promise.all(qrcodePromises);
    const qrcodeMap = resolvedQRcodes.reduce((acc, qrcode) => {
      acc[qrcode.itemId] = qrcode.base64String;
      return acc;
    }, {});
    setItemQRcodes(qrcodeMap);
  };

  const fetchMediumQRcodes = async () => {
    const qrcodePromises = mediums.map(async (medium) => {
      try {
        const response = await fetch(`http://localhost:8080/inventory/medium/showQR/${medium.MEDIUM_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
        }
        const arrayBuffer = await response.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return { mediumId: medium.MEDIUM_ID, base64String };
      } catch (error) {
        console.error('Error fetching QR code:', error);
        return { mediumId: medium.MEDIUM_ID, base64String: null };
      }
    });

    const resolvedQRcodes = await Promise.all(qrcodePromises);
    const qrcodeMap = resolvedQRcodes.reduce((acc, qrcode) => {
      acc[qrcode.mediumId] = qrcode.base64String;
      return acc;
    }, {});
    setMediumQRcodes(qrcodeMap);
  };

  useEffect(() => {
    fetchItems();
    fetchMediums();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      fetchItemQRcodes();
    }
  }, [items])

  useEffect(() => {
    if (mediums.length > 0) {
      fetchMediumQRcodes();
    }
  }, [mediums])
    
  return (
    <div className='qrcode'>
        <div className="info">
            <div className="textdiv">
                <img src={icon} alt="" style={{ width: '45px', height: '45px' }} />
                <h1 style={{ marginLeft: "-10px" }}>QR Codes</h1>
            </div>
        </div>
        <div className="qrcodecontainer">
        {items.map((item) => (
            { ...items, id: item.ITEM_ID },
            <Card key={item.ITEM_ID} itemId={item.ITEM_ID} item={item} type="qrcode" codeImage={itemqrcodes[item.ITEM_ID]} className="qrcodes"/>
        ))}
        {mediums.map((medium) => (
            { ...mediums, id: medium.MEDIUM_ID },
            <Card key={medium.MEDIUM_ID} itemId={medium.MEDIUM_ID} item={medium} type="qrcode" codeImage={mediumqrcodes[medium.MEDIUM_ID]} className="qrcodes"/>
        ))}
        </div>
    </div>
  )
}

export default Qrcodes