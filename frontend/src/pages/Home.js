import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import {  useNavigate } from 'react-router'

function Home() {
  const navigate = useNavigate()
  const [Posts , setPosts] = useState([])

  useEffect(  ()=>{
    const fetchData = async()=>{

      try{
            const data =  await axios.get("http://localhost:8000/home" , {withCredentials:true})
    setPosts(data.data)
      }catch(err){
         
       if (err.response && err.response.status === 401) {
        console.log ("You are not authenticated. Please log in.");
          navigate('/login')
          alert("login first")
       
      } else {
        console.error(err.message);
      }
    }

    
     

    }

    fetchData()
  },[])

// const fetchData = async ()=>{
   
// }

  return (
    <>

    {
      Post? (<div className="container-fluid">
          <div className="container">
           
     


           
           <div className="row justify-content-center">
              
              {
                Posts.map((post)=> (
                    <Post key={post._id} data= {post}  />
                ))
              }
              
            </div>
           
            
            
          </div>
        </div>):(<div>loading...</div>)
    }
        
    </>
  )
}

export default Home
