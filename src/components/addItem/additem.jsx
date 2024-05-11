import React from 'react'
import "./additem.scss"

const additem = (props) => {
    return (
    <div className='additem'>
        <div className="modal">
            <span className="close" onClick={()=>props.setOpen(false)}>x</span>
            <h1>Add New {props.slug}</h1>
            <form onSubmit={props.handleSubmit}>
                {props.columns.filter(item=>item.headerName !== "ID" && item.field !=="CREATE_DATE" && item.field !=="LAST_MODIFIED")
                .map(column=>(
                    <div className="item">
                        {column.field !== 'IMAGE' ? (
                            <input type="text" name={column.field} value={props.formData[column.field]} onChange={props.handleChange} placeholder={column.headerName} />
                            ) : (
                            props.formData.IMAGE !== null && <input type="file" name={column.field} onChange={props.handleImageChange} />
                        )}
                    </div>
                ))}
                <div className="buttonDiv">
                    <button>Add</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default additem