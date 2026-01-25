import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'

function Home() {
  const [Posts , setPosts] = useState([])

  useEffect(  ()=>{
    const fetchData = async()=>{

      try{
            const data =  await axios.get("http://localhost:8000/home" , {withCredentials:true})
    setPosts(data.data)
      }catch(err){
         
       if (err.response && err.response.status === 401) {
        alert("You are not authenticated. Please log in."); // or redirect to login
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
        <div className="container-fluid">
          <div className="container">
            hello
            {/* <button onClick={fetchData}>Click to get post</button> */}

            <div className="row">
              
              {
                Posts.map((post)=> (
                    <Post key={post._id} data= {post}  />
                ))
              }
              
            </div>
            
          </div>
        </div>
    </>
  )
}

export default Home
