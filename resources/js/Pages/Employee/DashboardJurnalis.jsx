import React from 'react'
import NavbarJurnalis from '../../Components/Layout/NavbarJurnalis.jsx'
import CardDashboard from '../../Components/Card/CardDashboard.jsx'
import LineChart from '../../Components/Card/LineChart.jsx'
import { FaNewspaper } from 'react-icons/fa'
import '../../../css/dashboard.css'

const DashboardAdmin = () => {
  return (
    <div className='dashboardAdmin'>
        <aside>
            <NavbarJurnalis/>
        </aside>
        <main>
            <section className='cardContainer'>
                <CardDashboard label='Traffic News' icon={<FaNewspaper/>} count={100}/>
                <CardDashboard label='Traffic Like' icon={<FaNewspaper/>} count={100}/>
                <CardDashboard label='Traffic Comment' icon={<FaNewspaper/>} count={100}/>
            </section>
            <section className='adminChartContainer'>
                <LineChart title="Traffic News" labels={['Jan','Feb','Mar']} datasetLabel="News" dataValues={[5, 15, 10]} color="#235789"/>
                <LineChart title="Traffic Comment" labels={['Jan','Feb','Mar']} datasetLabel="Comment" dataValues={[5, 15, 10]} color="#235789"/>
                <LineChart title="Traffic Like" labels={['Jan','Feb','Mar']} datasetLabel="Like" dataValues={[5, 15, 10]} color="#235789"/>
                
            </section>
        </main>
    </div>
  )
}

export default DashboardAdmin