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
const { default: RoleAuth } = require('./Middleware/RoleAuth')


const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000' ,"http://10.211.231.104:3000" ,"http://localhost:3001" , "https://studentfrontend-dpnz.onrender.com" ,"https://wardenfrontend.onrender.com" ] ,
    credentials : true
}))

db()


app.get('/' ,(req , res)=>{
    res.send("server ready !!")
})

app.get('/home' , auth, async (req,res)=>{ 
     // all posts data from database

    // const now = new Date();
    // const data = await Post.find({ tillTime: { $gt: now } })
    //     .populate("createdBy", "name")
    //     .lean();
    // res.json(data);

    
    const data = await PostSchema.Post.find()
    .populate("createdBy" , "name role") 
    .lean() 
    // console.log(data)
    res.json(data)
    
     
})
app.post('/login' ,  async (req, res)=>{


    const {gmail,name , expectedRole} = req.body   // de structuring gmail from (body)
    console.log(expectedRole)

    const user = await User.findOne({ gmail , name });
    if(!user){ return res.status(300).json("no user found")}

    
    if(expectedRole && user.role !== expectedRole){
        return res.status(400).json({ msg : `invalid auth ${expectedRole} cannot login here`})
    }
        const token = await jwt.sign( { "userid" : user._id , "role": user.role } , process.env.SECRET_KEY , {expiresIn : '1h'})
        res.cookie("token" , token , {maxAge: 60 * 60 * 1000, httpOnly:true , sameSite : 'none' , secure : true}).status(200).json({
            msg : "login successfull" ,
            "userId" : user._id,
            "username" : user.name,
            "role" : user.role
        })
    
    
 
        // console.log(user._id);
        
    
    
    // console.log(gmail)


    
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
        const {content ,tillTime ,conditions  }  = req.body
        // if(!req.user.userid) {return res.json({msg:"Please Login First ."})}
        if(content){
           await PostSchema.Post.create(
            {
                content : content  ,
                conditions :conditions ,
                createdBy : req.user.userid,
                tillTime: new Date(tillTime)
                
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
        .populate("createdBy" , "name role")
        .lean()
        res.json(response)
    }catch(err){
        res.json(err)
    }
})


app.get('/logout' , (req , res)=>{
    const token = req.cookies.token     
    console.log(token)
    
    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
})

res.status(200).json("logged out")

    // res.cookie("token" , "none" ,{maxAge : 50000 , httpOnly:true}).json("cookie deleted success !!").status(200)
})


// app.get('/wardenHome' , auth , RoleAuth , (req,res)=>{
//     res.send("hello this is warden access!!")
// })

app.patch("/warden/updateStatus/post/:id" , auth , RoleAuth,  async (req,res)=>{
    const id = req.params.id 
    const {status} = req.body

    try{
    const allowed = ["Seen" , "Done" ,"Pending"]
    if(!allowed.includes(status)){
       return res.status(400).json("invalid status")
    }

    const post = await PostSchema.Post.findByIdAndUpdate(id , {status } , {new : true} )

    if(!post){
         return res.status(400).json("post not found")
    }

        return res.json({ msg : "status updated successfully" , post})

    }catch(err){
        res.status(500).json({"err": err.message})
}
})
 

app.listen(process.env.PORT ,()=>{
    console.log(`listening at ${process.env.PORT}`);
    
})