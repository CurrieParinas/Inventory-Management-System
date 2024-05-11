import React from 'react'
import './generalItem.scss'
import Card from '../../components/card/Card'


const GeneralItems = () => {
  return (
    <div className='general-item'>
      <div className="generalItemsContainer">
        {items.map((item) => (
            <Card key={item.ITEM_ID} item={item} type="generalItem" fetchCodeImage={fetchGeneralItem} className="general-items"/>
        ))}
      </div>
    </div>
  )
}

export default GeneralItems