import React, { useState, useEffect } from 'react';
import './barcode.scss';
import Card from '../../components/card/Card'; 

const Barcodes = () => {
  const [barcodes, setBarcodes] = useState([]);

  useEffect(() => {
    const fetchBarcodes = async () => {
        const mockData = [
            { item_id: '1', img1: 'path/to/image1.jpg', name: 'Barcode 1', description: 'Description for Barcode 1', assigned: 'Assigned to A', note: 'Somenote', type:'barcode'},
            { item_id: '2', img1: 'path/to/image2.jpg', name: 'Barcode 2', description: 'Description for Barcode 2', assigned: 'Assigned to B', note: 'Somenote', type:'barcode'},
            { item_id: '3', img1: 'path/to/image3.jpg', name: 'Barcode 3', description: 'Description for Barcode 3', assigned: 'Assigned to C', note: 'Somenote', type:'barcode'},
            { item_id: '4', img1: 'path/to/image4.jpg', name: 'Barcode 4', description: 'Description for Barcode 4', assigned: 'Assigned to D', note: 'Somenote', type:'barcode'},
            { item_id: '5', img1: 'path/to/image5.jpg', name: 'Barcode 5', description: 'Description for Barcode 5', assigned: 'Assigned to E', note: 'Somenote', type:'barcode'},
            { item_id: '6', img1: 'path/to/image6.jpg', name: 'Barcode 6', description: 'Description for Barcode 6', assigned: 'Assigned to F', note: 'Somenote', type:'barcode'},
            { item_id: '7', img1: 'path/to/image7.jpg', name: 'Barcode 7', description: 'Description for Barcode 7', assigned: 'Assigned to G', note: 'Somenote', type:'barcode'},
            { item_id: '8', img1: 'path/to/image8.jpg', name: 'Barcode 8', description: 'Description for Barcode 8', assigned: 'Assigned to H', note: 'Somenote', type:'barcode'},
            { item_id: '9', img1: 'path/to/image9.jpg', name: 'Barcode 9', description: 'Description for Barcode 9', assigned: 'Assigned to I', note: 'Somenote', type:'barcode'},
            { item_id: '10', img1: 'path/to/image10.jpg', name: 'Barcode 10', description: 'Description for Barcode 10', assigned: 'Assigned to J', note: 'Somenote', type:'barcode'},
        ];
        setBarcodes(mockData);
    };
    

    fetchBarcodes();
  }, []);

  return (
    <div className='barcode'>
      <div className="barcodecontainer">
        {barcodes.map((item) => (
            <Card key={item.item_id} item={item} className="barcodes"/>
        ))}
      </div>
    </div>
  );
};

export default Barcodes;
