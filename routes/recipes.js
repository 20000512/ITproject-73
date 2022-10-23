const router = require('express').Router();
//check authentication through JWT
const checkAuth = require('../middleware/check_auth');
//check format of object ID
const checkObjID = require('../middleware/check_obj_id');
let Recipe = require('../models/recipe.model');

//get all recipes (For convenience only, remove before handover)
router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
})

//delete all recipes (For convenience only, remove before handover)
router.route('/').delete((req, res) => {
    Recipe.remove({})
        .then(() => res.status(200).json('All recipes removed'))
        .catch(err => res.status(500).json(err));
})

//create a new recipe
router.route('/add').post(checkAuth, (req, res) => {
    //parse JSON for valid keys value pairs
    const {cover = "", title = "", description = "", content = "", state = ""} = req.body;
    
    //combine valid inputs with userID to form a recipe body
    const newBody = {
        userId: req.userData.id,
        cover,
        title,
        description,
        content,
        state
    }

    //create new recipe
    const newRecipe = new Recipe(newBody);
    
    //save new recipe
    newRecipe.save()
        .then(() => res.status(201).json('Recipe added'))
        .catch(err => res.status(500).json('Error: ' + err));
})

//get hottest recipe by likes
router.route('/hot').get(async (req, res) => {
    // Set up pagination parameters
    var { page = 1, limit = 10 } = req.query;
    // Convert pagination parameters to Number
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    try {
        // Set filter for published recipes
        const filter = {state: "published"};

        // Set fields that will be returned
        const fields = {
            cover: 1,
            title: 1,
            description: 1,
            content: 1,
            likesCount: 1,
        };
        
        // Get published recipes sorted by likes descending
        const query = await Recipe.find(filter)
            .select(fields)
            .sort({likesCount: -1})
            .limit(limit * 1)
            .skip((page - 1) * limit);

        // Get total number of pages
        const docCount = await Recipe.countDocuments(filter);
        const totalPage = Math.ceil(docCount / limit);
        
        // Return results
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

//get recipe by ID
router.route('/:id').get(checkObjID, async (req, res) => {
    try {
        //set fields that will be returned
        const fields = {
            userId: 1,
            cover: 1,
            title: 1,
            description: 1,
            content: 1,
            likesCount: 1,
        };
        
        //get recipe along with author information
        const recipe = await Recipe.findById(req.params.id)
            .populate('userId', 'username profilePicture')    
            .select(fields)    
             
        if (!recipe) {
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else {
            res.status(200).json({data: recipe});
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//delete recipe by ID
router.route('/:id').delete(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (recipe.userId.equals(req.userData.id)){
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
})

//update a recipe
router.route('/update/:id').put(checkAuth, checkObjID, async (req, res) => {
    //parse JSON for valid keys value pairs
    const {cover = "", title = "", description = "", content = "", state = ""} = req.body;
    //form updated recipe body
    const updatedRecipe = {
        cover,
        title, 
        description,
        content,
        state
    }

    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (recipe.userId.equals(req.userData.id)){
            //user is the author of the recipe
            await recipe.updateOne({$set: updatedRecipe});
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
})

//like or unlike a recipe
router.route('/like/:id').put(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (!recipe.likes.includes(req.userData.id)){
            //user did not like this recipe before, like recipe now
            await recipe.updateOne({
                $push: {likes: req.userData.id},
                $inc: {likesCount: 1}
            });
            res.status(200).json("The recipe has been liked");
        } else {
            //user like this recipe before, unlike recipe now
            await recipe.updateOne({
                $pull: {likes: req.userData.id},
                $inc: {likesCount: -1}
            });
            res.status(200).json("The recipe has been unliked");
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//search by typing keywords
router.route('/search/:keyword').get( async (req, res) => {
    // Set up pagination parameters
    var { page = 1, limit = 10 } = req.query;
    // Convert pagination parameters to Number
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    
    try {
        // Set filter based on case-insensitive keyword and published recipes
        const filter = {
            "$and": [
                {"$or": [
                    {title:{$regex:req.params.keyword, $options: 'i'}},
                    {description:{$regex:req.params.keyword, $options: 'i'}},
                    {content:{$regex:req.params.keyword, $options: 'i'}}
                ]},
                {state: 'published'}
            ]
        };

        // Set fields that will be returned
        const fields = {
            cover: 1,
            title: 1,
            description: 1,
            content: 1,
            likesCount: 1,
        };

        // Get filtered query results with page and limit specified
        const query = await Recipe.find(filter)
            .select(fields)
            .skip((page - 1) * limit)
            .limit(limit * 1);

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

//Get whether a user liked this recipe
router.route('/didlike/:id').get(checkAuth, checkObjID, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else if (!recipe.likes.includes(req.userData.id)){
            //user did not like this recipe, return false
            res.status(200).json(false);
        } else {
            //user like this recipe, return true
            res.status(200).json(true);
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//Add comment to a recipe
router.route('/comments/:id').put(checkAuth, checkObjID, async (req, res) => {
    //parse and construct comment JSON
    const {comment = ''} = req.body;
    const newComment = {
        userId: req.userData.id,
        comment
    };

    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else {
            //Add new comment to the front of the comment list
            await recipe.updateOne({
                $push: {comments: {$each: [newComment], $position: 0}},
                $inc: {commentsCount: 1}
            });
            res.status(200).json('Comment submitted');
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//Get comments of a recipe, sorted by createdAt descending
//(No explicit sorting required since new comment are inserted at the front...
//...of the comments array)
router.route('/comments/:id').get(checkObjID, async (req, res) => {
    // Set up pagination parameters
    var { page = 1, limit = 10 } = req.query;
    // Convert pagination parameters to Number
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // Set up projection for pagination and fields that will be returned
    const projection = {
        "comments": { 
            $map: {
                input: { $slice: ["$comments", (page - 1) * limit, limit] },
                in: {
                    userId: "$$this.userId",
                    comment: "$$this.comment"
                }
            }
        },
        "commentsCount": 1
    };

    try {
        // Get comments of the recipe, implicitly sorted by createdAt descending 
        const query = await Recipe
            .findById(req.params.id, projection)
            .populate('comments.userId', 'username profilePicture');

        if (!query){
            //recipe do not exist
            res.status(404).json('Recipe do not exist');
        } else {
            // Get total number of pages
            const commentsCount = query.commentsCount;
            const totalPage = Math.ceil(commentsCount / limit);
            
            // Return results
            res.status(200).json({
                data: query,
                currentPage: page,
                totalPage: totalPage
            });
        }
    } catch (err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

module.exports = router;
