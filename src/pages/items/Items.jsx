import React, { useEffect, useState } from 'react';
import './items.scss';
import DataTable from '../../components/datatable/dataTable';
import { itemRows } from '../../sidebar';
import Box from "../../assets/box.svg";
import AddItem from '../../components/addItem/additem';

const Items = () => {
    const [open, setOpen] = useState(false);
    const [trackedItems, setTrackedItems] = useState([]);
    const [formData, setFormData] = useState({
        ITEM: '',
        MEDIUM: '',
        TYPE: '',
        QUANTITY: '',
        START_CONSUMPTION_DATE: '',
        END_CONSUMPTION_DATE: ''
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });

        console.log(formData);
    
        try {
            const response = await fetch('http://localhost:8080/inventory/itemMedium/add', {
                method: 'POST',
                body: formDataWithImage,
            });
    
            if (!response.ok) {
                throw new Error('Failed to add tracked item');
            }
    
            // Reload the tracked items after adding a new item
            fetchTrackedItems();

            handleClose();
            setOpen(false); // Close the AddItem modal after successful submission
            setFormData({ // Clear the form data
                ITEM: '',
                MEDIUM: '',
                TYPE: '',
                QUANTITY: '',
                START_CONSUMPTION_DATE: '',
                END_CONSUMPTION_DATE: ''
            });
        } catch (error) {
            console.error('Error adding tracked item:', error);
        }
    };

    const resetFormData = () => {
        setFormData({
            ITEM: '',
            MEDIUM: '',
            TYPE: '',
            QUANTITY: '',
            START_CONSUMPTION_DATE: '',
            END_CONSUMPTION_DATE: ''
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
          headerName: 'Name of Item',
          width: 150,
          editable: true,
          headerAlign: 'center',
          align: 'center',
          placeholder: 'Enter name'
        },
        // {
        //   field: 'CREATE_DATE',
        //   headerName: 'Date Created',
        //   type: 'Date',
        //   width: 170,
        //   headerAlign: 'center',
        //   align: 'center',
        //   placeholder: 'Enter Date Created'
        // },
        // {
        //   field: 'LAST_MODIFIED',
        //   headerName: 'Date Modified',
        //   type: 'Date',
        //   width: 170,
        //   headerAlign: 'center',
        //   align: 'center',
        //   placeholder: 'Enter Date Modified'
        // },
          {
            field: 'MEDIUM',
            headerName: 'Medium',
            type: 'text',
            width: 130,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            placeholder: 'Enter medium'
          },
          {
            field: 'QUANTITY',
            headerName: 'Quantity*',
            type: 'number',
            width: 130,
            editable: true,
            headerAlign: 'center',
            align: 'center',
            placeholder: 'Enter quantity'
          },
          {
            field: 'START_CONSUMPTION_DATE',
            headerName: 'Start Consumption Date',
            type: 'date',
            width: 130,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'END_CONSUMPTION_DATE',
            headerName: 'End Consumption Date',
            type: 'date',
            width: 130,
            editable: true,
            headerAlign: 'center',
            align: 'center',
        },
      ];

    return (
        <div className='trackedItems'>
            <div className="info">
                <img src={Box} alt="" style={{width:'40px', height:'40px'}} />
                <h1 style={{marginLeft:"-10px"}}>Tracked Items</h1>
                <div className="buttonDiv" onClick={() => setOpen(true)}>
                    <button>Add New Tracked Item</button>
                </div>
            </div>
            <DataTable 
                slug="trackeditems" 
                columns={columns.filter(column => column.field !== 'IMAGE' && column.field !== 'TRACKED')} 
                rows={trackedItems.map(row => ({ ...row, id: row.ITEM_MEDIUM_ID }))} 
                handleRefresh={fetchTrackedItems}
            />
            {open && <AddItem 
                className="trackeditems" 
                slug="Tracked Items" 
                columns={columns} 
                setOpen={setOpen} 
                formData={formData}
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                handleImageChange={handleImageChange}
                resetFormData={resetFormData}
                setFormData={setFormData}/>}
        </div>
    );
}

export default Items;
