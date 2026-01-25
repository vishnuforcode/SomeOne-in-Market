import jwt from 'jsonwebtoken'

const auth = (req,res ,next) =>{
    const token = req.cookies.token ;
     if(!token) { return res.status(401).json("not authenticated")}

     try{
        const decoded = jwt.verify(token , process.env.SECRET_KEY) 

        req.user = decoded  // we can add new key to "req" object

        next()
     }catch(err){
        return res.status(401).json({msg: "token invalid"})
     }
}

export default  auth