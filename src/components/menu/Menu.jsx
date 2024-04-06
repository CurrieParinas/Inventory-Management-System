import React from 'react'
import {Link} from "react-router-dom"
import './menu.scss'
import {menu} from "../../sidebar";

const Menu = () => {
  return (
    <div className="menu">
        {menu.map((item) => (
        <div className="item">
            <span className='title'>{item.title}</span>
            {item.listItems.map((listItem) => (
            <Link to={listItem.url} className='listItem' key={listItem.id}>
                <img src={listItem.icon} alt="" style={{width:'30px', height:'30px'}}/>
                <span className="listItemTitle">{listItem.title}</span>
            </Link>
            ))}
        </div>
        ))}
    </div>
  )
}

export default Menu