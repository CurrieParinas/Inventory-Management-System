import React, { useEffect, useState } from 'react'
import './items.scss'
import DataTable from '../../components/datatable/dataTable'
import {itemRows} from '../../sidebar'
import Box from "../../assets/box.svg"
import AddItem from '../../components/addItem/additem'

const Items = () => {
    const [open,setOpen] = useState(false)

    const[trackedItems, setTrackedItems]=useState([])

    const fetchTrackedItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/itemMedium/allTracked');
          if (!response.ok) {
            throw new Error('Failed to fetch tracked items');
          }
          const data = await response.json();
          setTrackedItems(data);
        } catch (error) {
          console.error('Error fetching tracked items:', error);
        }
      };

    useEffect(() => {
        fetchTrackedItems();
    }, []);

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
    <div className='trackedItems'>
        <div className="info">
            <img src={Box} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Tracked Items</h1>
            <div className="buttonDiv">
                <button onClick={() => setOpen(true)}>Add New Tracked Item</button>
            </div>
        </div>
        <DataTable slug="trackeditems" columns={columns} rows={trackedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))}/>
        {open && <AddItem slug="trackeditems" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Items