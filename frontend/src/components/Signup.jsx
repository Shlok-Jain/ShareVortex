import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'
import AppContext from '../context/Context';
import Spinner from 'react-bootstrap/esm/Spinner';

export const Signup = () => {
  const context = useContext(AppContext)
  const { showLoading } = context;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async(e) => {
    try{
    e.preventDefault();
    setDisabled(true);
    document.getElementById('signup_spinner').style.display = 'block';
    document.getElementById('signup_text').style.display = 'none';
    await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }).then(async res => await res.json()).then(data => {
      if (!data.success) {
        const notification = new NotificationJS({
          message: data.error,  //specify message here
          type: 'alert',                          //specify type of notification
          duration: 5000,                          //duration in milliseconds
          theme: 'dark',                           //theme of notification
          sound: false,                             //for notificaion sound
          disable_timer: false,                     //set it true of you don't want timer
        })
        notification.show();
      }
      else {
        const notification = new NotificationJS({
          message: 'Account created successfully',  //specify message here
          type: 'success',                          //specify type of notification
          duration: 5000,                          //duration in milliseconds
          theme: 'dark',
        })
        notification.show();
        localStorage.setItem('authtoken', data.authtoken);
      }
    })
  }
    catch(err){
      const notification = new NotificationJS({
        message: 'Something went wrong. Please try again later',  //specify message here
        type: 'error',                          //specify type of notification
        duration: 5000,                          //duration in milliseconds
        theme: 'dark',
      })
      notification.show();
    }
    setDisabled(false);
    document.getElementById('signup_spinner').style.display = 'none';
    document.getElementById('signup_text').style.display = 'block';
  }
  return (
    <div className='signup-form'>
      <Form>
        <div className="signup-title">Create an account</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Choose a strong password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Button id="signup-btn" variant="primary" disabled={disabled} type="submit" onClick={(e) => handleSubmit(e)}>
          <Spinner id='signup_spinner' animation="border" size='sm' role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span id="signup_text">
            Create account
          </span>
        </Button>
        <Form.Group className="mt-3">
          <Form.Text>
            <span style={{ color: 'white', fontSize: '20px' }}>Already have an account?</span> <Link to='/login'><span style={{ fontSize: '20px', color: '#96d3ff' }} onClick={() => showLoading()}>Login</span></Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}
