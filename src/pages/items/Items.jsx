import React, { useState } from 'react'
import './items.scss'
import DataTable from '../../components/datatable/dataTable'
import {itemRows} from '../../sidebar'
import Box from "../../assets/box.svg"
import AddItem from '../../components/addItem/additem'

const Items = () => {
    const [open,setOpen] = useState(false)
    const columns = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 90,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'codename',
          headerName: 'Codename',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'brand',
          headerName: 'Brand',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'quantity',
          headerName: 'Quantity*',
          type: 'number',
          width: 130,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'storageMedium',
          headerName: 'Storage Medium',
          width: 180,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'storageLocation',
          headerName: 'Storage Location',
          width: 200,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'dateCreated',
          headerName: 'Date Created',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'dateModified',
          headerName: 'Date Modified',
          type: 'Date',
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
        <DataTable slug="trackeditems" columns={columns} rows={itemRows}/>
        {open && <AddItem slug="trackeditems" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Items