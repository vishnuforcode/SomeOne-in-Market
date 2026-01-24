const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PostSchema = require('./Schemas/Post.model')
const { User } = require('./Schemas/UserSchema')


const app = express()

app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000' ,
    credentials : true
}))

db()


app.get('/' ,(req , res)=>{
    res.send("server ready !!")
})

app.get('/home' , async (req,res)=>{ 
     // all posts data from database
    const data = await PostSchema.Post.find() 
    res.json(data)
  
     
})
app.post('/login' , async (req, res)=>{
    const {gmail} = req.body    // de structuring gmail from (body)
    const token = await jwt.sign( {gmail} , process.env.SECRET_KEY)
        res.cookie("token" , token , {maxAge: 10000 , httpOnly:true}).status(200).json({msg : "login succefull"})
    
    console.log(gamil)
})


app.post('/register' , async (req,res)=>{
           const data = req.body 
    try{
         if(data){
         const response = await User.create(data)
         res.json(response)
         }
    }catch(err){
        console.log(err);
        
    }
   
})

app.post('/post', async (req,res)=>{

    // post data to database
    
    try{
        const data = req.body
        if(data){
            await PostSchema.Post.create(data)
            res.send("done post")
        }
    }catch(err){
        console.log({"error" : err});
        
    }
     

    
})




app.listen(process.env.PORT ,()=>{
    console.log(`listening at ${process.env.PORT}`);
    
})