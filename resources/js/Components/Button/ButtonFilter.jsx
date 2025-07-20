import {React, useState} from 'react'
import '../../../css/button.css'
import SortTimeCustom from '../Input/SortTimeCustom.jsx'

const ButtonFilter = () => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className='buttonFilter'>
        <button className={activeButton === 'button1' ? 'active' : ''}
        onClick={() => setActiveButton('button1')}>latest</button>
        <button className={activeButton === 'button2' ? 'active' : ''}
        onClick={() => setActiveButton('button2')}>Trending</button>
        <SortTimeCustom />
    </div>
  )
}

export default ButtonFilter