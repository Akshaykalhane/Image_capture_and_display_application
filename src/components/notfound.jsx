import React from 'react'
import {Link} from 'react-router-dom'

function Notfound() {
  return (
    <div style={{marginTop:'20px'}}>
        <center>
        <Link to='/'>Back to Home</Link>
        &nbsp;
        Not found
        </center>
    </div>
  )
}

export default Notfound