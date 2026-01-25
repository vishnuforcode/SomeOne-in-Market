import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },

  hostelName :{ 
    type : String ,
    required :true 
  },
  
  gmail:{
    type : String,
    required : true 
  }


})

export const User = mongoose.model("User" , userSchema)