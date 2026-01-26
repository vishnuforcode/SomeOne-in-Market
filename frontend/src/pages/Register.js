import { useState } from "react"
import axios from 'axios'
import {  useNavigate } from "react-router"


function Register(){
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
      name : "",
      hostelName : "",
      gmail: ""
     
    })

  const handleChange =(e)=>{
   

      const {name , value} = e.target 
    setFormData(prev=> ({
      ...prev ,
      [name] : value
    }))
  }

  
   
    const handleSubmit = async (e)=>{
         e.preventDefault()
        console.log(formData);
        
         try{
            const res = await axios.post('http://10.211.231.104:8000/register' , formData) // for mobile --> http://10.211.231.104:8000 ,, for laptop --> http://localhost:8000
            console.log(res);
            navigate("/login")
            
         }catch(err){
          console.log({"err": err});
          
         }
        


    }
  

    return (
    <>
      <div className="container-fluid d-flex align-items-center">
        <div className="container d-flex justify-content-center align-items-center  ">
          <form className="form p-4 mt-4  " onSubmit={handleSubmit} style={{width:'40%', height:'50%'}} action="">
            <label htmlFor="">UserName</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} className="form-control mb-2" />

            <label htmlFor="">Hostel Name</label>
            <input name="hostelName" type="text" value={formData.hostelName} onChange={handleChange}  className="form-control mb-2 " />

            <label htmlFor="">Gmail</label>
            <input name="gmail" type="text" value={formData.gmail} onChange={handleChange}  className="form-control mb-2 " />

            <input type="submit" className="btn btn-primary form-control"/>
          </form>
        </div>
      </div>
    </>
    )
  
}

export default Register 
