import React, { useEffect, useState } from 'react'
import './archive.scss'
import DataTable from '../../components/datatable/dataTable'
import Box from "../../assets/box.svg"


const Archive = () => {
  const[archivedItems, setArchivedItems]=useState([])

    const fetchArchivedItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/inventory/itemMedium/allArchived');
          if (!response.ok) {
            throw new Error('Failed to fetch archived items');
          }
          const data = await response.json();
          setArchivedItems(data);
        } catch (error) {
          console.error('Error fetching archived items:', error);
        }
      };

    useEffect(() => {
        fetchArchivedItems();
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
    <div className='archivedItems'>
        <div className="info">
            <img src={Box} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Archived Items</h1>
        </div>
        <DataTable slug="archiveditems" columns={columns.filter(column => column.field !== 'IMAGE')} rows={archivedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))} handleRefresh={fetchArchivedItems}/>
    </div>
  )
}

export default Archive