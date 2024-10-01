import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='p-5 w-100 bg-dark'>
        <Row>
          <Col>
            <h2 className='text-light'>Project Fair</h2>
            <p style={{ textAlign: 'justify' }} className='text-light'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Corporis sint nobis vero omnis neque dolor unde minus, recusandae quibusdam velit,
              impedit odit eos fugiat minima adipisci dignissimos magnam soluta distinctio!</p>
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='text-light'>Links</h3>
            <Link to={'/'}>Landing</Link>
            <Link to={'/auth'}>Login</Link>
            {/* <Link to={'/reg'}>Register</Link> */}

          </Col>
          <Col className='d-flex flex-column align-items-center'>
          <h3 className='text-light'>References</h3>
          <a href="https://react.dev/" target='_blank'>React</a>
          <a href="https://react-bootstrap.github.io/" target='_blank'>React Bootstrap</a>
          <a href=""></a>
          </Col>

        
        </Row>
      </div>
      

    </>
  )
}

export default Footer