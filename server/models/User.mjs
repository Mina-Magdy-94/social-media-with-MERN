import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:/\w+@\w+.\w/
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewProfile:{
        type:Number,
        default:0
    },
    impressions:{
        type:Number,
        default:0
    }
},{timestamps:true})

export const User = mongoose.model("User",UserSchema)