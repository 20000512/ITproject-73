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
    /*email: {
        type: String,
        required: true,
        max: 40,
        unique: true,
        
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    familyName:{
        type:String,
        required: true
    },
    givenName:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
        
    },
    */

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;