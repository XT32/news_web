import React from 'react'
import '../../../css/input.css'

const inputTextAuth = ({type, placeholder}) => {
  return (
    <input type={type} className="inputTextAuth" placeholder={placeholder} />
  )
}

export default inputTextAuth