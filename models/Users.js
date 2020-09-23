const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    }

},{
    // for making an update and new datas in the schemas
    timestamps:true  
});


var User = mongoose.model('User',userSchema);
module.exports = User;
