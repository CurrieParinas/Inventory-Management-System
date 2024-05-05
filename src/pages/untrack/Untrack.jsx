import React, { useEffect, useState } from 'react'
import "./untrack.scss"
import openedBox from "../../assets/open-box.svg"
import DataTable from '../../components/datatable/dataTable'
import AddItem from '../../components/addItem/additem'
import { itemRowsUntracked } from '../../sidebar'

const Untrack = () => {
    const [open,setOpen] = useState(false)

    const[untrackedItems, setUntrackedItems]=useState([])

    const fetchUntrackedItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/itemMedium/allUntracked');
          if (!response.ok) {
            throw new Error('Failed to fetch untracked items');
          }
          const data = await response.json();
          setUntrackedItems(data);
        } catch (error) {
          console.error('Error fetching untracked items:', error);
        }
      };

    useEffect(() => {
        fetchUntrackedItems();
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
    <div className='untrackedItems'>
        <div className="info">
            <img src={openedBox} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Untracked Items</h1>
            <div className="buttonDiv">
                <button onClick={() => setOpen(true)}>Add New Untracked Item</button>
            </div>
        </div>
        <DataTable slug="untrackedItems" columns={columns} rows={untrackedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))}/>
        {open && <AddItem slug="untrackeditems" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Untrack