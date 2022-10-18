const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    image:{type: String},
    likes:{type: Array, default:[]},
    comments:{type: Array, default:[]},
    title: {type: String, required: true},
    description:{type: String, max:1000},
    content:{type: String, max:10000},
    recipeText:{type: String},
    //change to enum? https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
    
}, {
    timestamps: true,
});

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;