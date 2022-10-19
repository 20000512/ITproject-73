const router = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken')
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

//get draft recipes, sorted by createdAt descending
router.route('/draft').get(checkAuth, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        // Set filter for userId and published recipes
        const filter = {
            userId: req.userData.id,
            state: "draft"
        };
        
        // Get recipes sorted by createdAt descending
        const query = await Recipe.find(filter)
            .sort({createdAt: -1})
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

//get user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));//check
});

//signup
router.route('/signup').post(async (req, res) => {
    //create new User
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    
    //check if user already exists
    const oldUser = User.find({email: email});
    if((await oldUser).length >= 1){
        res.status(400).json('user already exists');
    }

    //save User
    const newUser = new User({email, password, username});
    newUser.save()
        .then(() => res.status(201).json('Sign up successful'))
        .catch(err => res.status(500).json('Error: ' + err));
});

//login
router.post("/login", async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email: email});

        if(!user || !await bcrypt.compare(password, user.password)){
            //login failed
            res.status(401).json('Incorrect email or password');
        }
        else {
            //login successful, create JWT token
            const token = jwt.sign({id: user._id, email: user.email},JWT_SECRET);
            res.status(200).json({message: 'Login successful', token: token});
        }
    } catch (err){
        //unknown error
        res.status(500).json('Error: ' + err);
    }
})

//update user by id
router.route('/update').put(checkAuth, (req, res) => {
    User.findById(req.userData.id)
        .then(user => {
            user.email = req.body.email;
            user.familyName = req.body.familyName;
            user.givenName = req.body.givenName;
            user.gender = req.body.gender;
            user.profilePicture = req.body.profilePicture;

            user.save()
            .then(() => res.json('user updated.'))
            .catch(err => res.status(400).json('Error: ' + err));


        })
        .catch(err => res.status(400).json('Error: ' + err));
        
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

