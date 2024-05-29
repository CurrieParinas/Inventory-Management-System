import React from 'react';
import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from "../../assets/view.svg";
import deleteIcon from "../../assets/delete.svg";
import archiveIcon from "../../assets/archive.svg";
import unarchiveIcon from "../../assets/unarchive.svg";


const DataTable = (props) => {
  const navigate = useNavigate();

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

  return (
    <div className='datatable'>
      <DataGrid
        style={{ minHeight: '30vh' }}
        className='dataGrid'
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
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
    </div>
  );
}

export default DataTable;
