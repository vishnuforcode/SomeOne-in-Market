import React, { useState } from 'react'
import axios from 'axios' 

function Login() {
    
    const [formData , setformData] = useState({
            name : "",
            gmail : ""
    })

    const handleChange =(e)=>{
        const {name , value} = e.target

        setformData(prev => ({
            ...prev ,
            [name] : value
        }))
    }

    const handleSubmit = async (e)=>{
            e.preventDefault()
            try{
                    const res = await axios.post('http://localhost:8000/login' , formData , {withCredentials :true})  
        console.log(res)
            }catch(err){
                console.log({"err": err})
            }
        

    }
  return (
    <>

    <div className="container-fluid">
        <div className="container">
            <form onSubmit={handleSubmit} className="form" action="">
                <label htmlFor="" className=''>username</label>
                <input type="text" name='name' value={formData.name} onChange={handleChange}
                 className='form-control mb-2 ' />

                <label htmlFor="" className="">gamil</label>
                <input type="text" name='gmail' value={formData.gmail} onChange={handleChange}
                className='form-control mb-2' />

                <input className='btn btn-primary form-control' type='submit'/>
            </form>
        </div>
    </div>

    </>
  )
}

export default Login
