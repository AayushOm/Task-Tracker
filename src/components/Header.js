import React from 'react'
import Button from './Button'

const Header = (props) => {
    return (
    <header className='header'>
      <h1>{props.title}</h1>
      <Button text={props.showadd?"Close":"Add"} color={props.showadd?"red":"green"} onClick={props.onAddtask} />

    </header>
  )
}

Header.defaultProps={
    title:"Task Tracker"
}

export default Header
