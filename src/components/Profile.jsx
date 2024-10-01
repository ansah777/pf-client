import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import server_url from '../services/server_url'
import { updateProfile } from '../services/allApis';
import { toast } from 'react-toastify';

function Profile() {
    const [open,setOpen]=useState(false)
    const [user,setuser]=useState({
        id:"",username:"",email:"",password:"",linkedin:"",profile:""
    })
    const[preview,setPreview]=useState("")
    const [existingProfile,setExistingProfile]=useState("")
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
            setuser({id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password,github:userDetails.github,
                linkedin:userDetails.linkedin,profile:""
            })
            setExistingProfile(userDetails.profile)
        }
    },[open])

    useEffect(()=>{
        if(user.profile){
             setPreview(URL.createObjectURL(user.profile))
        }
        else{
            setPreview("")
        }
    },[user.profile])
    console.log(user)

    const handleProfileUpdate=async()=>{
        console.log(user)
        const {username,password,email,github,linkedin,profile}=user
        if(!username || !password || !email || !github || !linkedin){
            toast.warning("Enter Valid Inputs")
        }
        else{
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("github", github)
            formData.append("linkedin", linkedin)
            preview ? formData.append("profile", profile) : formData.append("profile", existingProfile)

            const header={
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
                "ContentTtype":preview? "multipart/form-data":"application/json"
            }
            const result=await updateProfile(header,formData)
            if(result.status==200){
                console.log(result.data)
                toast.success("Profile Successfully Updated!")
                sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                setOpen(!open)
            }
            else{
                toast.error(result.response.data)
            }

        }
    }

    return (
        <>
            <div className='p-5 border shadow border-3 m-3'>
                <div className='d-flex justify-content-between'>
                    <h4>Profile</h4>
                    <button className='btn' onClick={()=>{setOpen(!open)}}>
                        <i className='fa-solid fa-check' style={{ color: '#63E6BE' }}></i>
                    </button>
                </div>
                { open &&
                <div>
                    <label htmlFor="in">
                        <input type="file" name='' onChange={(e)=>setuser({...user,profile:e.target.files[0]})} id='in' style={{ display: 'none' }} />
                        {
                            existingProfile==""?
                        <img className='img-fluid' style={{width:'300px'}} src={preview?preview:"https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"} alt="" />
                        :
                        <img className='img-fluid' width={'200px'} src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="im"/>
                        }
                    </label>
                    <FloatingLabel controlId="userinp" label="Username" className="mb-3" >
                        <Form.Control type="text" placeholder="username" value={user?.username} onChange={(e)=>setuser({...user,username:e.target.value})} />
                    </FloatingLabel>
                    <FloatingLabel controlId="Githubinp" label="GitHub Url" className="mb-3" >
                        <Form.Control type="text" placeholder="GitHub Url" value={user?.github} onChange={(e)=>setuser({...user,github:e.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="linkedin" label="LinkedIn" className="mb-3" >
                        <Form.Control type="text" placeholder="linkedin" value={user?.linkedin} onChange={(e)=>setuser({...user,linkedin:e.target.value})} />
                    </FloatingLabel>

                    <div className='d-grid mt-3'>
                        <button className='btn btn-block btn warning' onClick={handleProfileUpdate}>Update</button>
                    </div>
                </div>
}
            </div>
        </>
    )
}

export default Profile