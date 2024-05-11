import React from 'react'
import './medium.scss'
import Card from '../../components/card/Card'

const Medium = () => {
  return (
    <div className='medium'>
      <div className="mediumcontainer">
        {items.map((item) => (
            <Card key={item.ITEM_ID} item={item} type="medium" fetchCodeImage={fetchMedium} className="mediums"/>
        ))}
      </div>
    </div>
  )
}

export default Medium