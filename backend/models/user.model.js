const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Enum = require('mern-exercise-tracker/backend/modules/enum.js');

//const genders = new Enum(['Male', 'Female']);
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 40
    },
    password:{
        type:String,
        required:true,
        min:3
    },
    
    
    profilePicture:{
        type:String,
        default:""
    },
    familyName:{
        type:String,

        default:""
    },
    givenName:{
        type:String,

        default:""
    },
    gender:{
        type:String,

        default:""
    }
    
    

}, {
    timestamps: true,
});

const User = mongoose.model( 'User', userSchema);
module.exports = User;