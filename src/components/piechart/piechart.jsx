import React from 'react'
import "./piechart.scss"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
    { name: "Beauty", quantity: 150, color: "#70C6CF"},
    { name: "Fitness", quantity: 180, color: "#73A9FA"},
    { name: "Electronics", quantity: 260, color: "#7474B8"},
    { name: "Accessories", quantity: 50, color: "#C7E9FF"},
]

const piechart = () => {
  return (
    <div className='piechart'>
        <h2>Amount by Category</h2>
        <div className="chart">
            <ResponsiveContainer width="99%" height={180}>
                <PieChart>
                    <Tooltip 
                    contentStyle={{background:"white", borderRadius:"5px"}}
                    />
                    <Pie
                    data={data}
                    // cx="50%"
                    // cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="quantity"
                    >
                        {data.map((item) => (
                            <Cell 
                            key={item.name} 
                            fill={item.color} />
                        ))}
                    </Pie>
                    
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="options">
            {data.map(item =>(
                <div className="option" key={item.name}>
                    <div className="title">
                        <div className='dot' style={{backgroundColor:item.color}}/>
                        <span>{item.name}</span>
                    </div>
                    <span>{item.quantity}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default piechart