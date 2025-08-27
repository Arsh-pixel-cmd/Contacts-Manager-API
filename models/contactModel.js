// schema for our contacts

import mongoose from "mongoose";

const contactSchema =  mongoose.Schema({                        // this schema wiil actually have all the values we want in our contacts resource
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",
    },
    
    name:{
        type : String,
        required : [true , "Please add the contact name"],
    },
    email : {
        type : String,
        required : [true , "Please add the contact email address"],
    },
    phone : {
        type : String,
        required : [true , "Please add the contact phone Number"],
    },
},{// this is for time stamp
    timestamps : true,
}); 

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;