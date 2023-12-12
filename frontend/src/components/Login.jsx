import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import NotificationJS from 'notification-npm'
import '/node_modules/notification-npm/index.css'
import AppContext from '../context/Context';
import Spinner from 'react-bootstrap/Spinner';
import {Transition} from './Transition';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    document.title = 'Login | ShareVortex';
    const context = useContext(AppContext);
    const { showLoading } = context;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const history = useNavigate();
    // document.getElementById('login_spinner').style.display = 'none';

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        setDisabled(true);
        document.getElementById('login_spinner').style.display = 'block';
        document.getElementById('login_text').style.display = 'none';
        await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(async res => await res.json()).then(data => {
            if (!data.success) {
                const notification = new NotificationJS({
                    message: data.error,
                    type: 'alert',
                    duration: 5000,
                    theme: 'dark',
                    sound: false,
                    disable_timer: false,
                })
                notification.show();
            }
            else {
                const notification = new NotificationJS({
                    message: 'Logged in successfully',
                    type: 'success',
                    duration: 5000,
                    theme: 'dark',
                })
                notification.show();
                localStorage.setItem('authtoken', data.authtoken);
                history('/');
            }
        })
    }
    catch(err){
        const notification = new NotificationJS({
            message: 'Something went wrong. Please try again later',
            type: 'error',
            duration: 5000,
            theme: 'dark',
        })
        notification.show();
    }
        setDisabled(false);
        document.getElementById('login_spinner').style.display = 'none';
        document.getElementById('login_text').style.display = 'block';
    }
    return (
        <Transition>
        <div className='signup-form' style={{marginTop:'70px'}}>
            <Form>
                <div className="signup-title">Login</div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button id='login-btn' disabled={disabled} variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    <Spinner id='login_spinner' animation="border" size='sm' role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <span id="login_text">
                        Login
                    </span>
                </Button>
                <Form.Group className="mt-3">
                    <Form.Text>
                        <span style={{ color: 'white', fontSize: '20px' }}>Don't have an account?</span> <Link to='/signup'><span style={{ fontSize: '20px', color: '#96d3ff' }} onClick={() => showLoading()}>Create one</span></Link>
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
        </Transition>
    )
}
