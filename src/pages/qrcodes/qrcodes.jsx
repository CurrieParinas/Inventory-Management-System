import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card'; 
import './qrcodes.scss'

function Qrcodes() {
    const [qrcodes, setQrcodes] = useState([]);

    useEffect(() => {
      const fetchQrcodes = async () => {
          const mockData = [
              { item_id: '1', img1: 'path/to/image1.jpg', name: 'Qrcode 1', description: 'Description for Qrcode 1', assigned: 'Assigned to A', note: 'Somenote', type:'qrcode'},
              { item_id: '2', img1: 'path/to/image2.jpg', name: 'Qrcode 2', description: 'Description for Qrcode 2', assigned: 'Assigned to B', note: 'Somenote', type:'qrcode'},
              { item_id: '3', img1: 'path/to/image3.jpg', name: 'Qrcode 3', description: 'Description for Qrcode 3', assigned: 'Assigned to C', note: 'Somenote', type:'qrcode'},
              { item_id: '4', img1: 'path/to/image4.jpg', name: 'Qrcode 4', description: 'Description for Qrcode 4', assigned: 'Assigned to D', note: 'Somenote', type:'qrcode'},
              { item_id: '5', img1: 'path/to/image5.jpg', name: 'Qrcode 5', description: 'Description for Qrcode 5', assigned: 'Assigned to E', note: 'Somenote', type:'qrcode'},
              { item_id: '6', img1: 'path/to/image6.jpg', name: 'Qrcode 6', description: 'Description for Qrcode 6', assigned: 'Assigned to F', note: 'Somenote', type:'qrcode'},
              { item_id: '7', img1: 'path/to/image7.jpg', name: 'Qrcode 7', description: 'Description for Qrcode 7', assigned: 'Assigned to G', note: 'Somenote', type:'qrcode'},
              { item_id: '8', img1: 'path/to/image8.jpg', name: 'Qrcode 8', description: 'Description for Qrcode 8', assigned: 'Assigned to H', note: 'Somenote', type:'qrcode'},
              { item_id: '9', img1: 'path/to/image9.jpg', name: 'Qrcode 9', description: 'Description for Qrcode 9', assigned: 'Assigned to I', note: 'Somenote', type:'qrcode'},
              { item_id: '10', img1: 'path/to/image10.jpg', name: 'Qrcode 10', description: 'Description for Qrcode 10', assigned: 'Assigned to J', note: 'Somenote', type:'qrcode'},
          ];
          setQrcodes(mockData);
      };
      
  
      fetchQrcodes();
    }, []);
    
  return (
    <div className='qrcode'>
        <div className="qrcodecontainer">
        {qrcodes.map((item) => (
            <Card key={item.item_id} item={item} className="qrcodes"/>
        ))}
        </div>
    </div>
  )
}

export default Qrcodes