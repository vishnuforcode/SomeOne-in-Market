import React from 'react'
import { Link } from 'react-router-dom'

function Navabr() {
  return (
    <>
    <div className="container-fluid">
        
            <div className="row justify-content-between align-items-center p-2 mb-2" style={{backgroundColor:'gray' , opacity:'75%' , border:'2px solid gray'}}>
                <div className="col">
                    <Link className='h5 text-decoration-none' to={'/'}>SomeOneInMarket</Link>
                </div>

                <div className="col-lg-3 d-flex justify-content-around" >
                    <Link  className='h5 text-decoration-none'  to={'/login'}>Login</Link>
                    <Link  className='h5 text-decoration-none' to={'/register'}>Register</Link>
                    <Link  className='h5 text-decoration-none' to={'/post'}>Post</Link>
                </div>
            </div>
        
    </div>
    </>    

)
}

export default Navabr
