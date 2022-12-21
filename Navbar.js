import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Navbar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', backgroundColor: 'black' }}>
        <Link to='/' style={{textDecoration : 'none'}}> <h1 style={{ marginTop: '0.7rem', marginLeft: '1.5rem', color: 'grey' }}>Mo<strong style={{ color: 'white' }}>vies</strong> </h1></Link>
        <Link to='/favourites'style={{textDecoration : 'none'}}> <h1 style={{ marginLeft: '1.4rem', marginTop: '0.7rem', color: 'grey' }}> Fav<strong style={{ color: 'white' }}>ourites</strong></h1></Link>

      </div>
    )
  }
}

export default Navbar