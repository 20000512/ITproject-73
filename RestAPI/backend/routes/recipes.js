const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create a new recipe
router.route('/add').post((req, res) => {
    //const userId = req.body.userId;
    //const title = req.body.title;
    //const state = req.body.state;
    

    const newRecipe = new Recipe(req.body)

    newRecipe.save()
        .then(() => res.status(200).json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('recipe deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
//update a recipe

router.route('/update/:id').put(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if(recipe.userId === req.body.userId){
        recipe.updateOne({$set:req.body});
        recipe.save()
        .then(() => res.json('Recipe updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    }else{
        res.status(403).json("you can update only your recipe")
    }
       
});

//like and unlike a recipe
router.route('/:id/like').put(async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe.likes.includes(req.body.userId)) {
            await recipe.updateOne({$push: {Likes: req.body.userId}});
            res.status(200).json("The post has been liked")
        } else{
            await recipe.updateOne({$pull: {Likes: req.body.userId}});
            res.status(200).json("The post has been unliked")
        }

    }catch (err) {
        res.status(500).json(err);
    }
})

//get recipe by id
router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get timeline recipes
//router.get("/timeline")

module.exports = router;
