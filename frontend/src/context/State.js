import { useRef, useState } from 'react'
import AppContext from './Context'
import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'

const AppState = (props) => {
    const [user, setuser] = useState("{}");
    const loading_ref = useRef(null);

    const showLoading = () => {
        loading_ref.current.continuousStart();
        setTimeout(() => {
            loading_ref.current.complete();
        }, 500);
    }

    const fetchUser = async () => {
        document.getElementById('loading').style.display = 'block';
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
        document.getElementById('loading').style.display = 'none';
    }
    
    return (
        <AppContext.Provider value={{user,loading_ref,showLoading,fetchUser}}>
        {props.children}
        </AppContext.Provider>
    )
    }

export default AppState