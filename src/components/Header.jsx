import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context_Api/AuthContext';

function Header({status}) {
  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)
  const navigate=useNavigate()
  
  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setAuthStatus(false)
    navigate('/')
    
  }
  return (
   <>
    <Navbar className="bg-body-tertiary">
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="#home">
            <i className='fa-solid fa-diagram-project fa-xl' style={{color:'navy'}}/>
          {' '}
          Project Fair
          </Navbar.Brand>
          <div>
            {!status &&
            <button className='btn btn-outline-danger' onClick={handleLogout}>
             <i className='fa-solid fa-right-from-bracket' />
             Logout
            </button>
            }
          </div>
        </Container>
      </Navbar>
      
   </>
  )
}

export default Header