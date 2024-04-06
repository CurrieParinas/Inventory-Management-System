import React from 'react'
import "./datatable.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import EditIcon from "../../assets/view.svg"
import deleteIcon from "../../assets/delete.svg"

const dataTable = (props) => {
  const handleDelete = (id) => {
    //handle delete
    console.log (id + " deleted")
  }
  const actionColumn = {
    field:"action",
    headerName:"Action",
    headerAlign: 'center',
    width:180,
    renderCell:(params) => {
        return (
            <div className="action" style={{display:"flex", justifyContent:"center", gap:"5px"}}>
                <Link to={`/${props.slug}/${params.row.id}`}>
                    <img src={EditIcon} style={{width:"25px", height:"25px", marginTop:"15px"}}/>
                </Link>
                <Link className="delete" onClick={()=>handleDelete(params.row.id)}>
                    <img src={deleteIcon} style={{width:"25px", height:"25px", marginTop:"15px"}}/>
                </Link>
            </div>
        )
    }
  }
  return (
    <div className='datatable'>
        <DataGrid
        style={{ minHeight: '30vh' }}
        className='dataGrid'
        rows={props.rows}
        columns={[...props.columns,actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{toolbar:GridToolbar}}
        slotProps={{
            toolbar:{
                showQuickFilter:true,
                quickFilterProps:{debounceMs: 500}
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
  )
}

export default dataTable