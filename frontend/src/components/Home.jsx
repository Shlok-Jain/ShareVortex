import React, { useContext } from 'react'
import { Transition } from './Transition'
import '../css/home.css'
import AppContext from '../context/Context';

export const Home = () => {
  const context = useContext(AppContext);
  const { user,fetchUser } = context;
  if(!user.name && localStorage.getItem('authtoken')){
    fetchUser();
  }
  document.title = 'ShareVortex - Where the world connects';
  return (
    <Transition>
      {user.name?<h1 style={{marginTop:'70px'}}>Welcome {user.name}</h1>:
      <div className='home-main' style={{marginTop:'70px'}}>
      <h1 >ShareVortex</h1>
      <p>Where the world connects....</p>
    </div>}
      
    </Transition>
  )
}
