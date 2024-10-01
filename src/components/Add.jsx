import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addProjectResponseContext } from '../Context_Api/Contextapis';

function Add() {
    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [projectData,setProjectData]=useState({
        title:"",overview:"",language:"",github:"",demo:"",projectImage:""
    })
    const [imageStatus,setImageStatus]=useState(false)

    useEffect(()=>{
        console.log(projectData)
        if(projectData.projectImage.type=="image/jpg" ||projectData.projectImage.type=="image/jpeg"||projectData.projectImage.type=="image/png"){
            // console.log("Image format is correct")
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else{
            console.log("Invalid file format")
            setImageStatus(true)
            setPreview("")
        }
        
    },[projectData.projectImage])

    const handleAddProject=async()=>{
        const{title,overview,language,github,demo,projectImage}=projectData
        if(!title ||!overview||!language||!github||!demo||!projectImage){
            toast.warning("Invalid details")
        }
        else{
             const formData=new FormData()
             formData.append("title",title)
             formData.append("overview",overview)
             formData.append("language",language)
             formData.append("github",github)
             formData.append("demo",demo)
             formData.append("image",projectImage)

             const token=sessionStorage.getItem("token")
             const reqHeader={
                "content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
            const result=await addProject(formData,reqHeader)
            if(result.status==200){
                toast.success("Project Added Successfully")
                setProjectData({
                    title:"",overview:"",language:"",github:"",demo:"",projectImage:""
                })
                handleClose()
                setAddProjectResponse(result)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-info mb-4' onClick={handleShow}>
                Add Project
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label>
                                    <input type="file" name=''  onChange={(e)=>{setProjectData({...projectData,projectImage:e.target.files[0]})}} style={{ display: 'none' }} />
                                    <img className='img-fluid' src={preview?preview:"https://media.istockphoto.com/id/1346698461/photo/agile-software-development-with-developer-using-kanban-board-framework-methodology-on.jpg?s=612x612&w=0&k=20&c=KtXz5QIDt2qZUHtaUWzEWLTuf7dNUo07Ptbc56Lcf-o="} alt="" />
                                </label>
                                {
                                    imageStatus &&
                                    <p className='text-danger'>Invalid file format</p>
                                }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3" >
                                        <Form.Control type="text" onChange={e=>setProjectData({...projectData,title:e.target.value})} placeholder="Project Title" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overviewinp" label="OverView" className="mb-3" >
                                        <Form.Control type="text" placeholder="Brief about Project" onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="langinp" label="Languages" className="mb-3" onChange={e=>setProjectData({...projectData,language:e.target.value})}>
                                        <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProjectData({...projectData,language:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="Githubinp" label="GitHub Url" className="mb-3" onChange={e=>setProjectData({...projectData,github:e.target.value})} >
                                        <Form.Control type="text" placeholder="GitHub Url" />
                                    </FloatingLabel>

                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" placeholder="Demo Url" onChange={e=>setProjectData({...projectData,demo:e.target.value})}/>
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add