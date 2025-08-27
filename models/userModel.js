import mongoose from "mongoose";

const userSchema =  mongoose.Schema({                        // this schema wiil actually have all the values we want in our contacts resource
    userName:{
        type : String,
        required : [true , "Please enter your  username"],
    },
    userEmail : {
        type : String,
        required : [true , "Please enter your email address"],
        unique : [true , "Email already exists"], // so that we can have unique email addresses
        match  : [/\S+@\S+\.\S+/, "Email is invalid"], // this is a regex for email validation
    },
    password : {
        type : String,
        required : [true , "Please enter your password"],
    },
},{// this is for time stamp
    timestamps : true,
}); 

const User = mongoose.model('User', userSchema);
export default User;