import React, { useEffect, useRef, useState } from 'react'
import { Transition } from './Transition'
import '../css/editprofile.css'
import { useContext } from 'react'
import AppContext from '../context/Context'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'

export const EditProfile = () => {
  const context = useContext(AppContext);
  const [name, setname] = useState("")
  const { user,showNavigator } = context;
  const handlesubmit = async(e)=>{
    e.preventDefault()
    await fetch('http://localhost:5000/general/editname',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'authtoken':localStorage.getItem('authtoken')
      },
      body:JSON.stringify({name}),
      
    }).then(async(res)=>{
      const json = await res.json();
      if(!json.success){
        const notification = new NotificationJS({
            message: json.error,
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
        notification.show();
    }
    else{
      const notification = new NotificationJS({
        message: "Name updated successfully",
        type: 'success',
        duration: 5000,
        theme: 'dark',
    })
    notification.show();
    }
    })

  }
  return (
    <Transition>
      <div className='editprofile-page' style={{marginTop:'70px'}}>
      <h1>Edit Profile:</h1>
      <Form className='editprofile-form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Name:</Form.Label>
        <Form.Control onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Enter new name" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e)=>handlesubmit(e)}>
        Submit
      </Button>
    </Form>
    </div>
    </Transition>
  )
}
