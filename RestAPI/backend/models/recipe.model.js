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
    recipeText:{type: String},
    state:{type: String, required: true},
}, {
    timestamps: true,
});

const Recipe = mongoose.model('Exercise', recipeSchema);
module.exports = Recipe;