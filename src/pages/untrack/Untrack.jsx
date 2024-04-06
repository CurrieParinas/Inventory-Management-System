import React, { useState } from 'react'
import "./untrack.scss"
import openedBox from "../../assets/open-box.svg"
import DataTable from '../../components/datatable/dataTable'
import AddItem from '../../components/addItem/additem'
import { itemRowsUntracked } from '../../sidebar'

const Untrack = () => {
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
    <div className='untrackedItems'>
        <div className="info">
            <img src={openedBox} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Untracked Items</h1>
            <div className="buttonDiv">
                <button onClick={() => setOpen(true)}>Add New Untracked Item</button>
            </div>
        </div>
        <DataTable slug="untrackedItems" columns={columns} rows={itemRowsUntracked}/>
        {open && <AddItem slug="untrackeditems" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Untrack