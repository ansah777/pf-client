import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCards from '../components/ProjectCards'
import { Link } from 'react-router-dom'
import { homeProjects } from '../services/allApis'
function Landing() {
    const [projects,setProjects]=useState([])
    const [token,setToken]=useState("")
    useEffect(()=>{
        setToken(sessionStorage.getItem("token"))
        getHomeProjects()
    },[])

    const getHomeProjects=async()=>{
        const result= await homeProjects()
        console.log(result)
        if(result.status==200){
          setProjects(result.data)
        }
        else{
            console.log(result.response.data)
        }
    }
    console.log(projects)
    return (
        <>
            <div className='w-100 align-items-center d-flex p-5' style={{ height: '100vh', background:'teal' }}>
                <Row>
                    <Col className='align-items-center d-flex'>
                        <div>
                            <h1 className='display-4 mb-2 tex-light'> Project Fair</h1>
                            <p className='' style={{ textAlign: 'justify' }}> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
                            {/* <button className='btn btn-success'>Explore </button> */}
                            {
                                token?
                            <Link className='btn btn-warning' to={'/dash'}>Manage Your Projects</Link>
                             :
                            <Link className='btn btn-success' to={'/auth'}>Start to explore</Link>

                            }
                        </div>
                    </Col>

                    <Col>
                        <img className='img-fluid' src="https://online.imt-pm.com/media/6cfe13624f9263e83b9fa3609d27a41b.jpeg" alt="image" />
                    </Col>
                </Row>
            </div>

            <div className='p-5 w-100'>
                <h2 className='text-center mt-4 mb-3 '>Check My Projects...</h2>
                <marquee behavior="scroll" direction="left" scrollamount='14'>
                    <div className='d-flex justify-content-evenly mt-2'>
                       {
                        projects.length>0 ?
                        projects.map(item=>(
                            <ProjectCards project={item} />
                        ))
                        :
                        <h5>No projects Available</h5>
                       }
                    </div>
                </marquee>

                <div className='text-center'>
                    <Link to={'/projects'}>Click for More</Link>
                </div>
            </div>



        </>
    )
}

export default Landing
