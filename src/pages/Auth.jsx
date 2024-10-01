import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userLogin, userRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context_Api/AuthContext';

function Auth() {
    const{authStatus,setAuthStatus}=useContext(TokenAuthContext)
    const [status, setStatus] = useState(true)
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "", password: "", email: ""
    })
    console.log(data)

    const changeStatus = () => {
        setStatus(!status)
    }

    const handleRegister = async () => {
        console.log(data)
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Invalid Details!!")
        } else {
            const result = await userRegister(data)
            console.log(result)
            if (result.status == 201) {
                toast.success("User Registration Successfull")
                setData({ username: "", password: "", email: "" })
                setStatus(true)
                
                
            }
            else {
                toast.error(result.response.data)
            }
        }

    }

    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Invalid Details!!")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result)
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
                toast.success("Login SuccessFull!!")
                navigate('/')
                setAuthStatus(true)
                
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow border w-50 p-4'>
                    <Row>
                        <Col sm={12} md={6}>
                            <img src="https://static.vecteezy.com/system/resources/previews/037/338/229/non_2x/2-step-authentication-illustration-concept-secure-login-verification-password-or-sms-with-push-code-message-on-smartphone-or-desktop-pc-computer-for-sites-landing-pages-apps-posters-and-banners-vector.jpg" alt="" className='img-fluid' />
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <h3>Login</h3>
                                    :
                                    <h3>Register</h3>
                            }
                            <div className='mt-4'>
                                {
                                    !status &&
                                    <FloatingLabel controlId="user" label="Username" className="mb-3">
                                        <Form.Control type="text" placeholder="username" onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                    </FloatingLabel>
                                }
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                </FloatingLabel>

                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                {
                                    status ?
                                        <button className='btn btn-info' onClick={handleLogin}>
                                            <span>Login</span>
                                        </button>
                                        :
                                        <button className='btn btn-info' onClick={handleRegister}>
                                            <span>Register</span>
                                        </button>

                                }

                                <button className='btn btn-link' onClick={changeStatus}>{
                                    status ?
                                        <span>Are you New?</span>
                                        :
                                        <span>Already A User?</span>
                                }</button>

                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default Auth