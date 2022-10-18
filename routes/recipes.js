const router = require('express').Router();
//check authentication through JWT
const checkAuth = require('../middleware/check_auth');
//check format of object ID
const checkObjID = require('../middleware/check_obj_id');
let Recipe = require('../models/recipe.model');
const multer = require('multer');
//uploads
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './uploads/images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
//upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
  
//get all recipes
router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});


//create a new recipe
router.route('/add').post(checkAuth,upload.single('image') ,(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;

    //include userID to attribute recipe author
    const newBody = {
        title: req.userData.id
    }
    const userId = req.userData.id;
    const newRecipe = new Recipe({title,description,image})
    
    newRecipe.save()
        .then(() => res.status(201).json('Recipe added'))
        .catch(err => res.status(500).json('Error: ' + err));
});

//get recipe by ID
router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete recipe by ID
router.route('/:id').delete(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (recipe.userId === req.userData.id){
            //user is the author of the recipe
            await recipe.delete();
            res.status(200).json('Recipe deleted');
        } else {
            //user is not the author of the recipe
            res.status(403).json('Recipe deletion failed, user is not the recipe author');
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
});

//update a recipe
router.route('/update/:id').put(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (recipe.userId === req.userData.id){
            //user is the author of the recipe
            await recipe.updateOne({$set:req.body});
            await recipe.save()
            res.status(200).json('Recipe updated');
        } else {
            //user is not the author of the recipe
            res.status(403).json("Recipe update failed, user is not the recipe author");
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }   
});

//like or unlike a recipe
router.route('/like/:id').put(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (!recipe.likes.includes(req.userData.id)){
            //user did not like this recipe before, like recipe now
            await recipe.updateOne({$push: {likes: req.userData.id}});
            res.status(200).json("The recipe has been liked");
        } else {
            //user like this recipe before, unlike recipe now
            await recipe.updateOne({$pull: {likes: req.userData.id}});
            res.status(200).json("The recipe has been unliked");
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//search by typing keywords
router.route('/search/:keyword').get( async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    try {
        // Set filter
        const filter = {
            "$or":[
                {title:{$regex:req.params.keyword}},
                {description:{$regex:req.params.keyword}},
                {recipeText:{$regex:req.params.keyword}}
            ]
        };

        // Get filtered query results with page and limit specified
        const query = await Recipe.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Get total number of pages
        const docCount = await Recipe.countDocuments(filter);
        const totalPage = Math.ceil(docCount / limit);
            
        res.status(200).json({
            data: query,
            currentPage: page,
            totalPage: totalPage
        });
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})
//get timeline recipes
//router.get("/timeline")

module.exports = router;
