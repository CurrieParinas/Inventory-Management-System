import React, { useEffect, useState } from 'react'
import "./untrack.scss"
import openedBox from "../../assets/open-box.svg"
import DataTable from '../../components/datatable/dataTable'
import AddItem from '../../components/addItem/additem'
import { itemRowsUntracked } from '../../sidebar'

const Untrack = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        NAME: '',
        DESCRIPTION: '',
        BRAND: '', // Added BRAND field
        PARENT_LOCATION: '',
        PARENT_MEDIUM_ID: '',
        IMAGE: ''
    });

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

    const resetFormData = () => {
        setFormData({
          NAME: '',
          DESCRIPTION: '',
          BRAND: '',
          CODENAME: '',
          IMAGE: '',
        });
      };
    
      const handleClose = () => {
        setOpen(false);
        resetFormData();
      };

    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size <= (1 * 1024 * 1024)) { // Max size is 1MB
            setFormData({ ...formData, IMAGE: e.target.files[0] });
        } else {
            alert('File size exceeds the maximum allowed limit (1MB).');
            // Optionally, you can clear the file input field
            e.target.value = null;
        }
    };


    const columns = [
        { 
          field: 'TRACKED', 
          headerName: 'ID', 
          width: 90,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter ID'
        },
        {
          field: 'NAME',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter name'
        },
        {
          field: 'CODENAME',
          headerName: 'Codename',
          width: 120,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter codename'
        },
        {
            field: 'DESCRIPTION',
            headerName: 'Description',
            width: 150,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            placeholder: 'Enter description',
        },
        {
          field: 'BRAND',
          headerName: 'Brand',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter brand'
        },
        {
          field: 'CREATE_DATE',
          headerName: 'Date Created',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter Date Created'
        },
        {
          field: 'LAST_MODIFIED',
          headerName: 'Date Modified',
          type: 'Date',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter Date Modified'
        },
        {
          field: 'IMAGE',
          headerName: 'Image',
          type: 'file',
          width: 170,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Upload Image'
        },
      ];
    return (
    <div className='untrackedItems'>
        <div className="info">
            <img src={openedBox} alt="" style={{width:'40px', height:'40px'}}/>
            <h1 style={{marginLeft:"-10px"}}>Untracked Items</h1>
            <div className="buttonDiv" onClick={() => setOpen(true)}>
                <button>Add New Untracked Item</button>
            </div>
        </div>
        <DataTable 
            slug="untrackedItems" 
            columns={columns.filter(column => column.field !== 'IMAGE')} 
            rows={untrackedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))}/>
        {open && <AddItem 
            slug="Untracked Items" 
            columns={columns} 
            setOpen={setOpen}
            formData={formData} 
            handleChange={handleChange} 
            // handleSubmit={handleSubmit} 
            handleImageChange={handleImageChange}
            resetFormData={resetFormData}/>}
    </div>
  )
}

export default Untrack