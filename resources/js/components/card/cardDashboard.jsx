import React from 'react'
import '../../../css/card.css'

const CardDashboard = ({count,label,icon}) => {
  return (
    <div className='cardDashboard'>
        <div className="label">
            <label>{label}</label>
            <p>{icon}</p>
        </div>
        <h2>{count}</h2>
    </div>
  )
}

export default CardDashboard