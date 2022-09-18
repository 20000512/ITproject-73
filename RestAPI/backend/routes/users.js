const router = require('express').Router();
let User = require('../models/user.model');

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
router.route('/signup').post((req, res) => {
    //create new User
    const email = req.body.email;
    const password = req.body.password;
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
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            var validemail = 0;
            res.status(404).json( "User not found");
        }
        if (req.body.password != user.password){
            var validpassword = 0;
            res.status(400).json("password incorrect");
        }
        if (validemail && validpassword){
            res.status(200).json("login successful!!!");
        }
    } catch (err){
        console.log(err);
    }

})

//update user by id
router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
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
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
