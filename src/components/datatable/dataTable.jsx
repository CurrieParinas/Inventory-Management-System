import React from 'react';
import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from "../../assets/view.svg";
import deleteIcon from "../../assets/delete.svg";
import archiveIcon from "../../assets/archive.svg";

const DataTable = (props) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // handle delete
    console.log(id + " deleted");
  };

  const handleArchive = (id) => {
    // handle archive
    console.log(id + " archived");
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
          <button className="archive" onClick={() => handleArchive(params.row.id)} style={{ background: "none", border: "none" }}>
            <img src={archiveIcon} style={{ width: "25px", height: "25px" }} />
          </button>
          <button className="delete" onClick={() => handleDelete(params.row.id)} style={{ background: "none", border: "none" }}>
            <img src={deleteIcon} style={{ width: "25px", height: "25px" }} />
          </button>
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
