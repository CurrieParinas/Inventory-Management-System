import React, { useState } from 'react';
import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from "../../assets/view.svg";
import deleteIcon from "../../assets/delete.svg";
import archiveIcon from "../../assets/archive.svg";
import unarchiveIcon from "../../assets/unarchive.svg";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };
  


const DataTable = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowID,setRowID] = useState();

  const handleOpen = (row,id) => {
    setRowID(id);
    setQuantity(row.quantity);
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/delete/${id}`, {
          method: 'POST'
      });

      if (!response.ok) {
          throw new Error('Failed to delete item');
      }

      props.handleRefresh();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/setArchived/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      props.handleRefresh();
    } catch (error) {
      console.error('There was an error archiving the item!', error);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/setVisible/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      props.handleRefresh();
    } catch (error) {
      console.error('There was an error unarchiving the item!', error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/${props.slug}/${id}`);
  };

  const handleAdd = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/addQuantity/${id}/${quantity}`, {
          method: 'POST'
      });

      if (!response.ok) {
          throw new Error('Failed to add quantity');
      }

      props.handleRefresh();
    } catch (error) {
        console.error('Error adding quantity:', error);
    }
  };

  const handleSubtract = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/inventory/itemMedium/subtractQuantity/${id}/${quantity}`, {
          method: 'POST'
      });

      if (!response.ok) {
          throw new Error('Failed to subtract quantity');
      }

      props.handleRefresh();
    } catch (error) {
        console.error('Error subtracting quantity:', error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    headerAlign: 'center',
    width: 180,
    renderCell: (params) => {
      return (
        <div className="action" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", marginTop: "13px" }}>
          <button onClick={() => handleNavigate(params.row.id)} style={{ background: "none", border: "none" }}>
            <img src={EditIcon} style={{ width: "25px", height: "25px" }} />
          </button>
          <button className="delete" onClick={() => handleDelete(params.row.id)} style={{ background: "none", border: "none" }}>
                <img src={deleteIcon} style={{ width: "25px", height: "25px" }} />
            </button>
          {props.slug === "archiveditems" ? ( 
            <button className="unarchive" onClick={() => handleUnarchive(params.row.id)} style={{ background: "none", border: "none" }}>
                <img src={unarchiveIcon} style={{ width: "25px", height: "25px" }} />
            </button>
          ) : (
            <button className="archive" onClick={() => handleArchive(params.row.id)} style={{ background: "none", border: "none" }}>
                <img src={archiveIcon} style={{ width: "25px", height: "25px" }} />
            </button>
          )}
        </div>
      );
    }
  };

  const quantityEditColumn = {
    field: 'editQuantity',
    headerName: 'Edit Quantity',
    headerAlign: 'center',
    width: 165,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => handleOpen(params.row, params.row.id)} id={params.row.id} >
        Edit Quantity
      </Button>
    ),
  };

  const columns = props.columns.map((col) => 
    col.field === 'QUANTITY' ? [col, quantityEditColumn] : col
  ).flat();


  return (
    <div className='datatable'>
      <DataGrid
        style={{ minHeight: '30vh' }}
        className='dataGrid'
        rows={props.rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
          <h2 id="modal-modal-title">Edit Quantity</h2>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          </>
          <>
          <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button variant="contained" color="primary" onClick={() => handleAdd(rowID)}>
                +
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleSubtract(rowID)}>
                -
            </Button>
          </div>
          </>
        </Box>
      </Modal>
    </div>
  );
}

export default DataTable;