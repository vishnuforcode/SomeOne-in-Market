const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PostSchema = require('./Schemas/Post.model')
const { User } = require('./Schemas/UserSchema')
const { default: auth } = require('./Middleware/Auth')

const cookieParser = require('cookie-parser')
const { Request } = require('./Schemas/request.model')


const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000' ,"http://10.211.231.104:3000" ] ,
    credentials : true
}))

db()


app.get('/' ,(req , res)=>{
    res.send("server ready !!")
})

app.get('/home' , auth, async (req,res)=>{ 
     // all posts data from database
    const data = await PostSchema.Post.find()
    .populate("createdBy" , "name") 
    .lean() 
    // console.log(data)
    res.json(data)
    
     
})
app.post('/login' , async (req, res)=>{


    const {gmail} = req.body   // de structuring gmail from (body)

    const user = await User.findOne({ gmail });
    if(!user){ return res.status(300).json("no user found")}
 
        // console.log(user._id);
        
    const token = await jwt.sign( { "userid" : user._id } , process.env.SECRET_KEY , {expiresIn : '1h'})
        res.cookie("token" , token , {maxAge: 60 * 60 * 1000, httpOnly:true , sameSite : 'lax' , secure : false}).status(200).json({msg : "login succefull" ,
            "userId" : user._id,
            "username" : user.name
        })
    
    console.log(gmail)


    
})


app.post('/register' , async (req,res)=>{
           const data = req.body 
           console.log(data);
           
    try{
         if(data){
         const response = await User.create(data)
         res.json(response)
         }
    }catch(err){
        console.log(err);
        
    }
   
})

app.post('/post', auth , async (req,res)=>{

    // post data to database
        const user = req.user
        console.log(user)
    try{
        const data  = req.body
        // if(!req.user.userid) {return res.json({msg:"Please Login First ."})}
        if(data){
           await PostSchema.Post.create(
            {
                ...req.body,
                createdBy : req.user.userid,
                
            }
           )
            
            res.send("done post")
        }
    }catch(err){
        console.log({"error" : err});
        
    }
     

    
})

app.post('/request' , async (req,res)=>{
    const data = req.body 
 
    try{
        const response = await Request.create(data)
        console.log(response)
        res.status(200).json("request created successfully")
    }catch(err){
        res.json({"err" : err})
    }
})

app.get('/post/:id' , async (req, res)=>{
    const id = req.params.id 
    try{
        const response = await PostSchema.Post.findById(id)
        .populate("createdBy" , "name")
        .lean()
        res.json(response)
    }catch(err){
        res.json(err)
    }
})


app.get('/logout' , (req , res)=>{
    const token = req.cookies.token     
    console.log(token)
    
    res.cookie("token" , "none" ,{maxAge : 50000 , httpOnly:true}).json("cookie deleted success !!").status(200)
})

 

app.listen(process.env.PORT ,()=>{
    console.log(`listening at ${process.env.PORT}`);
    
})