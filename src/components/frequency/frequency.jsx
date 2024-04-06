import React from 'react'
import "./frequency.scss"
import { ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts'

const frequency = (props) => {
  return (
    <div className='frequency'>
        <h2>{props.title}</h2>
        <div className="chart">
            <ResponsiveContainer width="99%" height={110}>
                <BarChart width={150} height={40} data={props.chartData}>
                    <Tooltip
                    contentStyle={{background:"#2a3447", borderRadius:"5px"}}
                    labelStyle={{display:"none"}}
                    cursor={{fill:"none "}}
                    />
                    <Bar dataKey={props.dataKey} fill={props.color}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default frequency