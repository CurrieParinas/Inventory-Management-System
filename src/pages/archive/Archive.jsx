import React, { useEffect, useState } from 'react'
import './archive.scss'
import DataTable from '../../components/datatable/dataTable'
import Box from "../../assets/box.svg"
import { format } from 'date-fns';


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
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'BRAND',
          headerName: 'Brand',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'MEDIUM_NAME',
          headerName: 'Medium',
          width: 150,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'LOCATION_NAME',
          headerName: 'Location',
          width: 150,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'QUANTITY',
          headerName: 'Quantity*',
          type: 'number',
          width: 100,
          editable: true,
          headerAlign: 'center',
          align: 'center',
        },
        {
          field: 'START_CONSUMPTION_DATE',
          headerName: 'Start Consumption Date',
          type: 'Date',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => params.value ? format(new Date(params.value), 'MM/dd/yyyy') : 'N/A',
        },
        {
          field: 'END_CONSUMPTION_DATE',
          headerName: 'End Consumption Date',
          type: 'Date',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => params.value ? format(new Date(params.value), 'MM/dd/yyyy') : 'N/A',
        },
    ];

  return (
    <div className='archivedItems'>
        <div className="info">
            <img src={Box} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Archived Items</h1>
        </div>
        <DataTable slug="archiveditems" columns={columns.filter(column => column.field !== 'IMAGE' && column.field !== 'ITEM_MEDIUM_ID')} rows={archivedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))} handleRefresh={fetchArchivedItems}/>
    </div>
  )
}

export default Archive