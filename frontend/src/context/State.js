import { useEffect, useRef, useState } from 'react'
import AppContext from './Context'
import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'
import useDidMountEffect from '../useDidMountEffect'

const AppState = (props) => {
    const [user, setuser] = useState("{}");
    const [showNavigator, setshowNavigator] = useState(false)
    const loading_ref = useRef(null);

    const showLoading = () => {
        loading_ref.current.continuousStart();
        setTimeout(() => {
            loading_ref.current.complete();
        }, 500);
    }

    useEffect(()=>{
        if(!user.name){
            setshowNavigator(false);
        }
        else{
            setshowNavigator(true);
        }
    },[user])

    const fetchUser = async () => {
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('loading').style.animation = 'showloading 325ms ease-in-out forwards';
        try{
                await fetch('http://localhost:5000/auth/fetchuser',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'authtoken':localStorage.getItem('authtoken')
                    }
                    }
                ).then(async (res)=>{
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
                        setuser(json.user);
                    }
                })
        }
        catch(err){
            const notification = new NotificationJS({
                message: 'Something went wrong!',
                type: 'error',
                duration: 5000,
                theme: 'dark',
            })
            notification.show();
            const notification2 = new NotificationJS({
                message: 'Make sure you are connected to the internet and try again!',
                type: 'alert',
                duration: 5000,
                theme: 'dark',
            })
            notification2.show();
        }
        document.getElementById('loading').style.animation = 'hideloading 325ms ease-in-out forwards';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 325);
    }
    
    return (
        <AppContext.Provider value={{user,showNavigator,setuser,loading_ref,showLoading,fetchUser}}>
        {props.children}
        </AppContext.Provider>
    )
    }

export default AppState