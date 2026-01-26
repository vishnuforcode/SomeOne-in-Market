import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'


function CreateRequest() {
    const params = useParams()
    const userfromstore = useSelector((state)=> state.auth)

    const [post ,setPost] = useState(null)
    // console.log(userfromstore)

    useEffect(()=>{
        const getSinglePost = async ()=>{
            const singlePost = await axios.get(`http://10.211.231.104:8000/post/${params.id}`)
            // console.log(singlePost.data)
            setPost(singlePost.data)
        }

        getSinglePost()
      
    }, [params.id])
    const navigate = useNavigate()
//   console.log(post)
    const [ request , setrequest] = useState({
        createdBy : "" ,
        content : "" ,
        createdOn : params.id
    })

    // console.log(request)

    useEffect(()=>{
        if(userfromstore.userid){
            setrequest(prev=> ({
                ...prev ,
                createdBy : userfromstore.userid ,
            }))
        }
    } , [userfromstore.userid])
    const handlechange =(e)=>{

        
            const {name , value} = e.target
        setrequest(prev => ({
            ...prev ,

            [name] : value , 
            
        }) )           
    }

     // console.log(request);
            
     const handleSubmit = async (e)=>{
        e.preventDefault() 

        try{
            
           const res =  await axios.post("http://10.211.231.104:8000/request", request , {withCredentials : true})
           console.log(res);

           navigate('/')
           

        }catch(err){
            console.log({"err": err})
        }
     }
  return (
        <>

        {
            post? (<div className="container-fluid">
                <div className="container">
                    <form action="" className='form' onSubmit={handleSubmit}>
                        <label htmlFor="">request on {post.createdBy.name} Post</label>
                        <input type="text" name='content' value={request.content} onChange={handlechange} className='form-control mb-2' />

                        <input type="submit" className='btn btn-primary form-control' />
                    </form>
                </div>
            </div>):(<div>loading...</div>)
        }
            
        
        </>
  )
}

export default CreateRequest
