const router = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto  = require('crypto');
//check authentication through JWT
const checkAuth = require('../middleware/check_auth');
//check format of object ID
const checkObjID = require('../middleware/check_obj_id');
let User = require('../models/user.model');
let Recipe = require('../models/recipe.model');
JWT_SECRET = 'asdasdasdasdsdf+659+523ewrfgarf6r5faw+f+-**/-/-*/*5*/3-*5/3-*5/266345^&*(^%&UJHUH';

//get all users
router.route('/').get((req, res) => {
 User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete all users
router.route('/').delete((req, res) => {
    User.remove({})
        .then(() => console.log('All users removed'))
        .catch(err => console.log(err));
})

//get posted recipes, sorted by createdAt descending
router.route('/post').get(checkAuth, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Set filter for userId and published recipes
        const filter = {
            userId: req.userData.id,
            state: "published"
        };
        
        // Get recipes sorted by createdAt descending
        const query = await Recipe.find(filter)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit * 1);

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

//get draft recipes, sorted by createdAt descending
router.route('/draft').get(checkAuth, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Set filter for userId and draft recipes
        const filter = {
            userId: req.userData.id,
            state: "draft"
        };
        
        // Get recipes sorted by createdAt descending
        const query = await Recipe.find(filter)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit * 1);

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

//get liked recipes, sorted by createdAt descending
router.route('/like').get(checkAuth, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Set filter for userId in likes and published recipes
        const filter = {
            likes: req.userData.id,
            state: "published"
        };
        
        // Get recipes sorted by createdAt descending
        const query = await Recipe.find(filter)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit * 1);

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

//Get profile
router.route('/profile').get(checkAuth, (req, res) => {
    //Set fields that are needed: username and profile picture
    const fields = {username: 1, profilePicture: 1};

    //Return profile: username and profile picture
    User.findById(req.userData.id)
        .select(fields)
        .then(user => res.json(user))
        .catch(err => res.status(500).json('Error: ' + err));
});

//signup
router.route('/signup').post(async (req, res) => {
    //create new User
    //Turn email to lowercase since email is case insensitive
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    
    //check if user already exists
    const oldUser = User.find({email: email});
    if ((await oldUser).length >= 1){
        res.status(400).json('user already exists');
    } else {
        //save new user
        const newUser = new User({email, password, username});
        newUser.save()
            .then(() => res.status(201).json('Sign up successful'))
            .catch(err => res.status(500).json('Error: ' + err));
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user || !await bcrypt.compare(password, user.password)){
            //login failed
            res.status(401).json('Incorrect email or password');
        }
        else {
            //login successful, create JWT token
            const currentLoginTime = Date.now();
            const token = jwt.sign({id: user._id, loginTime: currentLoginTime},JWT_SECRET);

            await user.updateOne({$set: {currentLoginTime: currentLoginTime}});

            res.status(200).json({message: 'Login successful', token: token});
        }
    } catch (err){
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//update user profile
router.route('/update').put(checkAuth, async (req, res) => {
    // If no field, replace with empty
    const profilePicture = req.body.profilePicture ? req.body.profilePicture : "";

    try {
        const user = await User.findById(req.userData.id);
        await user.updateOne({$set: {profilePicture: profilePicture}});

        // User profile updated
        res.status(200).json('user updated');
    } catch(err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
});

//delete user by id,his recipes and likes
router.route('/delete').put(checkAuth, async (req, res) => {
    try {
        // Delete recipes authored by this user
        await Recipe.deleteMany({userId: req.userData.id});
        // Remove user like records
        await Recipe.updateMany(   
            {$pull: { likes: req.userData.id}}
        );
        // Delete user
        await User.findByIdAndDelete(req.userData.id);
        
        res.status(200).json('User deleted');
    } catch(err) {
        //unknown error
        res.status(500).json('Error: ' + err);
    }
});


module.exports = router;

