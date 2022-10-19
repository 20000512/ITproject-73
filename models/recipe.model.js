const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    // ID of the author
    userId: {
        type: String,
        required: true
    },
    image: {type: String},
    title: {type: String, required: true},
    // Is size limit required for description and content?
    description: {type: String, max:1000},
    content: {type: String, max:10000},

    likes: {type: [String], default: []},
    likesCount: {type: Number, default: 0},
    comments: {type: [String], default: []},
    commentsCount: {type: Number, default: 0},
    //change to enum? https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
    // State is either "published" or "draft"
    state: {type: String, required: true}
}, {
    timestamps: true,
});

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;