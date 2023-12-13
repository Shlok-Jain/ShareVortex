import React, { useEffect, useRef } from 'react'
import { Transition } from './Transition'
import '../css/editprofile.css'
import { useContext } from 'react'
import AppContext from '../context/Context'

export const EditProfile = () => {
  const context = useContext(AppContext);
  const { user,showNavigator } = context;
  const ref = useRef(null);
  useEffect(()=>{
    if(showNavigator){
      ref.current.style.width = '75%'
    }
    else{
      ref.current.style.width = '100%'
    }
  },[user])
  return (
    <Transition>
      <div ref={ref} className='editprofile-page' style={{marginTop:'70px'}}>
      <h1>Edit Profile:</h1>
    </div>
    </Transition>
  )
}
