import React from 'react'
import "./additem.scss"

const additem = (props) => {
    const handleSubmit =(e)=> {
        e.preventDefault();

        //add item
    }
  return (
    <div className='additem'>
        <div className="modal">
            <span className="close" onClick={()=>props.setOpen(false)}>x</span>
            <h1>Add New {props.slug}</h1>
            <form onSubmit={handleSubmit}>
                {props.columns.filter(item=>item.field !== "id" && item.field !=="img")
                .map(column=>(
                    <div className="item">
                        <label htmlFor="">{column.headerName}</label>
                        <input type={column.type} placeholder={column.field}/>
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