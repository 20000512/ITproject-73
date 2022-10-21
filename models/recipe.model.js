const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    // ID of the author
    userId: {
        type: String,
        required: true
    },
    cover: {type: String},
    title: {type: String, required: true},
    description: {type: String},
    content: {type: String},

    likes: {type: [String], default: []},
    likesCount: {type: Number, default: 0},
    comments: {type: [String], default: []},
    commentsCount: {type: Number, default: 0},
    // State is either "published" or "draft"
    state: {type: String, required: true}
}, {
    timestamps: true,
});

const Recipe = mongoose.model('recipes', recipeSchema);
module.exports = Recipe;