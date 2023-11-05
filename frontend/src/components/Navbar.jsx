import React from 'react'
import { useContext } from 'react'
import AppContext from '../context/Context'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const context = useContext(AppContext)
  const { user,showLoading } = context;

  return (
    <nav>
      <div className="icon">ShareVortex</div>
      {JSON.parse(user).name ? (
        <>
          {/* // content to showif user is logged in */}
          <div className="dp">dp</div>
        </>
      ):(<>
          {/* // content to show if user is not logged in */}
          <div className="login-buttons">
            <Link to='/signup'><Button onClick={()=>showLoading()} style={{margin: '5px'}} variant="success">Sign Up</Button>{' '} </Link>
            <Link to='/login'><Button onClick={()=>showLoading()} style={{margin: '5px'}} variant="danger">Login</Button>{' '} </Link>
          </div>
        </>
      )}
    </nav>
  )
}


// TODO: Add Browser router