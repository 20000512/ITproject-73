const router = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check_auth');
let User = require('../models/user.model');
JWT_SECRET = 'asdasdasdasdsdf+659+523ewrfgarf6r5faw+f+-**/-/-*/*5*/3-*5/3-*5/266345^&*(^%&UJHUH';
router.route('/').get((req, res) => {
 User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//signup
router.route('/signup').post(async (req, res) => {
    //create new User
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = User({email, password});
//save User
    newUser.save()
        .then(() => res.json('Signed up successful!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//login
router.post("/login", async (req, res) => {
    try {
        var validpassword = 1;
        var validemail = 1;
        const {email,password} = req.body;
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            var validemail = 0;
            res.status(404).json( "User not found");
        }
        if (! await bcrypt.compare(password, user.password)){
            var validpassword = 0;
            res.status(400).json("password incorrect");
        }
        if (validemail && validpassword){
            const token = jwt.sign({id: user._id,email:user.email},JWT_SECRET);
            res.status(200).json({statis:"login successful!!!",data: token});
        }
    } catch (err){
        console.log(err);
    }

})

//update user by id
router.route('/update').put(checkAuth,(req, res) => {
    User.findById(req.userData.id)
        .then(user => {
            user.email = req.body.email;
            user.description = req.body.description;
            user.duration = Number(req.body.duration);
            user.date = Date.parse(req.body.date);

            user.save()
            .then(() => res.json('user updated.'))
            .catch(err => res.status(400).json('Error: ' + err));


        })
        .catch(err => res.status(400).json('Error: ' + err));
        
});
//delete user by id
router.route('/').delete(checkAuth,(req, res) => {
    User.findByIdAndDelete(req.userData.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log(req.userData.id);
});

module.exports = router;
