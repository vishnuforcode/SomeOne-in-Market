const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./db')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors({
    origin:'*'
}))

db()


app.get('/' ,(req , res)=>{
    res.send("server ready !!")
})

app.get('/home' , (req,res)=>{ 
    // all posts data from database
})

app.post('/post',(req,res)=>{
    const data = req.body

    // post data to database
})




app.listen(process.env.PORT ,()=>{
    console.log(`listening at ${process.env.PORT}`);
    
})