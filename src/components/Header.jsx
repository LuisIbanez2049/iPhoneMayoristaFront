import React from 'react'

function Header(props) {
  return (
    <header>
        <div>
            <div>{props.children}</div>
        </div>
    </header>
  )
}

export default Header