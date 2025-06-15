import React from 'react'
import NavbarAdmin from '../../components/layout/navbarAdmin.jsx'
import CardDashboard from '../../components/card/cardDashboard.jsx'
import LineChart from '../../components/card/lineChart.jsx'
import { FaNewspaper } from 'react-icons/fa'
import '../../../css/admin.css'

const DashboardAdmin = () => {
  return (
    <div className='dashboardAdmin'>
        <aside>
            <NavbarAdmin/>
        </aside>
        <main>
            <section className='cardContainer'>
                <CardDashboard
                label='Traffic News'
                icon={<FaNewspaper/>}
                count={100}/>
                <CardDashboard
                label={'New User'}
                icon={<FaNewspaper/>}
                count={100}/>
            </section>
            <section className='adminChartContainer'>
                <LineChart
                    title="Traffic News"
                    labels='agustu'
                    datasetLabel="News"
                    dataValues={[5, 15, 10, 20, 35, 45]}
                    color="#235789"
                />
                <LineChart
                    title="Total User"
                    labels='agustu'
                    datasetLabel="User"
                    dataValues={[5, 15, 10, 20, 35, 45]}
                    color="#235789"
                />
            </section>
        </main>
    </div>
  )
}

export default DashboardAdmin