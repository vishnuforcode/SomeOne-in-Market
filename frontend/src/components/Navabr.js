import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { setAuth } from '../slices/AuthSlice'

function Navabr() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuth = useSelector((state)=> state.auth.currentAuth)
    console.log(isAuth)
    const handleLogOut =()=>{
        try{
            const res = axios.get("http://10.211.231.104:8000/logout" , {withCredentials : true})
            // console.log(res);
            navigate('/login')
                dispatch(
                    setAuth({isAuth: false , userid : "" , username : ""})
                )
            alert("logOut successfully")

        }catch(err){
            console.log({"err": err})
        }
    }
  return (
    <>
    <div className="container-fluid">
        
            <div className="row justify-content-between align-items-center p-2 mb-2" style={{backgroundColor:'gray' , opacity:'75%' , border:'2px solid gray'}}>
                <div className="col">
                    <Link className='h5 text-decoration-none' to={'/'}>SomeOneInMarket</Link>
                </div>

                <div className="col-lg-3 d-flex justify-content-around" >
                    {
                        isAuth? (<>
                       
                        <Link  className='h5 text-decoration-none' to={'/post'}>Post</Link>
                        <button onClick={handleLogOut}>Logout</button>
                        </>)
                    :
                    (<>
                    <Link  className='h5 text-decoration-none'  to={'/login'}>Login</Link>
                    <Link  className='h5 text-decoration-none' to={'/register'}>Register</Link>
                    <Link  className='h5 text-decoration-none' to={'/post'}>Post</Link>
                    <button onClick={handleLogOut}>Logout</button>
                    </>)
                    }
                    
                   
                </div>
            </div>
        
    </div>
    </>    

)
}

export default Navabr
