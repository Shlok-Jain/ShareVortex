import { useRef, useState } from 'react'
import AppContext from './Context'

const AppState = (props) => {
    const [user, setuser] = useState("{}");
    const loading_ref = useRef(null);

    const showLoading = () => {
        loading_ref.current.continuousStart();
        setTimeout(() => {
            loading_ref.current.complete();
        }, 500);
    }
    
    return (
        <AppContext.Provider value={{user,loading_ref,showLoading}}>
        {props.children}
        </AppContext.Provider>
    )
    }

export default AppState