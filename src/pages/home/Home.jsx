import React from 'react'
import './home.scss'
import TopBox from '../../components/topbox/TopBox'
import Unt from '../../components/unt/unt'
import Location from '../../components/location/Location'
import Medium from '../../components/medium/Medium'
import RecentTitle from '../../components/recenttitle/RecentTitle'
import Frequency from '../../components/frequency/frequency'
import Piechart from '../../components/piechart/piechart'
import {barChartTrackedItemsAdded, barChartUntrackedItemsAdded} from "../../sidebar"

const Home = () => {
  return (
    <div className='home'>
        <div className="box box1" style={{background: 'linear-gradient(to right, #70c6cf, #73a9fa)'}}>
            <RecentTitle/>
        </div>
        <div className="box box2">
            <Location/>
        </div>
        <div className="box box3">
            <Medium/>
        </div>
        <div className="box box4" >
            
            <TopBox/>
        </div>
        <div className="box box5">
            <Unt/>
        </div>
        <div className="box box6">
            <Frequency {...barChartTrackedItemsAdded}/>
        </div>
        <div className="box box7">
            <Piechart/>
        </div>
        <div className="box box8">
            
        <Frequency {...barChartUntrackedItemsAdded}/>
        </div>
    </div>
  )
}

export default Home