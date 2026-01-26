import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import store from '../store/store'
import { useNavigate } from 'react-router'

function CreatePost() {
    const userAuthId = useSelector((state) => state.auth.userid)
    // console.log(userAuthId);

    const navigate = useNavigate()
    


    const [postData , setPostData] = useState({
        createdBy : "",
        content : "",
        tillTime : "" ,
        conditions : ""
    })

    const handleChange =(e)=>{
        const { name , value} = e.target

        setPostData(prev =>({
            ...prev ,

            [name] : value
        }))
    }


    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            const res = await axios.post('http://localhost:8000/post' , postData , {withCredentials : true})
           console.log(res.data);
           navigate("/")
          
            
        }catch(err){
            console.log({"err": err});
            navigate('/login')
            
        }
    }
  return (
    <>

    {
        userAuthId? ( <div className="container-fluid">
        <div className="container">
            <form action="" onSubmit={handleSubmit}>
                    
                <label htmlFor="" >Content</label>
                <input type="text" name='content' value={postData.content} onChange={handleChange} className='form-control mb-2 ' />

                <label htmlFor="" >Till Time</label>
                <input type="time" name='tillTime' value={postData.tillTime} onChange={handleChange} className='form-control mb-2 ' />

                <label htmlFor="" >Conditions (optional)</label>
                <input type="text" name='conditions' value={postData.conditions} onChange={handleChange} className='form-control mb-2' />

                <input type="submit" className='form-control btn btn-primary' />
            </form>
        </div>
    </div>):(
        <div className='container-fluid'>
            <div className='container text-center'>
                Login First
            </div>
        </div>
    )
    }
   
    </>
  )
}

export default CreatePost
