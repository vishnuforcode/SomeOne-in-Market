import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router' 
import {useDispatch } from 'react-redux'
import { setAuth } from '../slices/AuthSlice'
import { Link } from 'react-router'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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
        console.log(res.data)

               
                navigate('/')

                 dispatch(
                    setAuth({isAuth: true , userid : res.data.userId , username : res.data.username})
                )
        
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
                <div className='text-center form-control'>
                     <span>new user <Link to={'/register'}>register</Link></span>
                </div>
                   
            </form>
        </div>
    </div>

    </>
  )
}

export default Login
