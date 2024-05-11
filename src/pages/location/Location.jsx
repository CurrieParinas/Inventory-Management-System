import React from 'react'
import './location.scss'
import Card from '../../components/card/Card'

const Location = () => {
  return (
    <div className='location'>
      <div className="locationcontainer">
        {items.map((item) => (
            <Card key={item.ITEM_ID} item={item} type="location" fetchCodeImage={fetchLocation} className="locations"/>
        ))}
      </div>
    </div>
  )
}

export default Location