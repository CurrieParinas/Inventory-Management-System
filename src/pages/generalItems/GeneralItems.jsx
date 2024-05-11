import React, { useEffect, useState } from 'react'
import './generalItem.scss'
import Card from '../../components/card/Card'
import AddItem from '../../components/addItem/additem'
import icon from "../../assets/generalitem.svg"


const GeneralItems = () => {
  const[items, setItems]=useState([])
  const [open,setOpen] = useState(false)

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

    const columns = [
        { 
          field: 'ITEM_MEDIUM_ID', 
          headerName: 'ID', 
          width: 90,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'NAME',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'CODENAME',
          headerName: 'Codename',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'BRAND',
          headerName: 'Brand',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'QUANTITY',
          headerName: 'Quantity*',
          type: 'number',
          width: 130,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'MEDIUM_NAME',
          headerName: 'Storage Medium',
          width: 180,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'LOCATION_NAME',
          headerName: 'Storage Location',
          width: 200,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'CREATE_DATE',
          headerName: 'Date Created',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'LAST_MODIFIED',
          headerName: 'Date Modified',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
        },
        {
            field: 'IMAGE',
            headerName: 'Image',
            type: 'file',
            width: 170,
            headerAlign: 'center',
            align: 'center',
        },
    ];

  return (
    <div className='general-item'>
        <div className="info">
            <div className="textdiv">
                <img src={icon} alt="" style={{width:'45px', height:'45px'}}/>
                <h1 style={{marginLeft:"-10px"}}>General Items</h1>
            </div>
            <div className="buttonDiv" onClick={() => setOpen(true)}>
                <button >Add New Item</button>
            </div>
        </div>
      <div className="generalItemsContainer">
        {items.map((item) => (
            <Card key={item.ITEM_ID} itemId={item.ITEM_ID} item={item} type="general-item" fetchCodeImage={() => fetchItemImage(item.ITEM_ID)} className="general-items"/>
            
        ))}
        {open && <AddItem slug="trackeditems" columns={columns} setOpen={setOpen}/>}
      </div>
    </div>
  )
}

export default GeneralItems