import React, { useContext, useEffect, useRef } from 'react'
import { Transition } from './Transition'
import '../css/home.css'
import AppContext from '../context/Context';

export const Home = () => {
  const context = useContext(AppContext);
  const ref = useRef(null);
  const { user,fetchUser,showNavigator } = context;
  if(!user.name && localStorage.getItem('authtoken')){
    fetchUser();
  }
  document.title = 'ShareVortex - Where the world connects';
  useEffect(()=>{
    if(showNavigator){
      ref.current.style.width = '75%'
    }
    else{
      ref.current.style.width = '100%'
    }
  },[showNavigator])
  return (
    <Transition>
      <div ref={ref} className='home-page' style={{marginTop:'70px'}}>
      {user.name?<h1>Welcome {user.name}</h1>:
      <div className='home-main'>
      <h1 >ShareVortex</h1>
      <p>Where the world connects....</p>
    </div>}
    </div>
    </Transition>
  )
}
