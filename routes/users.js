const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//check authentication through JWT
const checkAuth = require("../middleware/check_auth");
//check format of object ID
const checkObjID = require("../middleware/check_obj_id");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
let User = require("../models/user.model");
let Recipe = require("../models/recipe.model");

//get published recipes, sorted by createdAt descending
router.route("/post").get(checkAuth, async (req, res) => {
  // Set up pagination parameters
  var { page = 1, limit = 10 } = req.query;
  // Convert pagination parameters to Number
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {
    // Set filter for userId and published recipes
    const filter = {
      userId: req.userData.id,
      state: "published",
    };

    // Set fields that will be returned
    const fields = {
      cover: 1,
      title: 1,
      description: 1,
      content: 1,
      likesCount: 1,
    };

    // Get published recipes sorted by createdAt descending
    const query = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .select(fields);
    //   .skip((page - 1) * limit)
    //   .limit(limit * 1);

    // Get total number of pages
    const docCount = await Recipe.countDocuments(filter);
    const totalPage = Math.ceil(docCount / limit);

    // Return results
    res.status(200).json({
      data: query,
      currentPage: page,
      totalPage: totalPage,
    });
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

//get draft recipes, sorted by createdAt descending
router.route("/draft").get(checkAuth, async (req, res) => {
  // Set up pagination parameters
  var { page = 1, limit = 10 } = req.query;
  // Convert pagination parameters to Number
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {
    // Set filter for userId and draft recipes
    const filter = {
      userId: req.userData.id,
      state: "draft",
    };

    // Set fields that will be returned
    const fields = {
      cover: 1,
      title: 1,
      description: 1,
      content: 1,
      likesCount: 1,
    };

    // Get draft recipes sorted by createdAt descending
    const query = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .select(fields);
    //   .skip((page - 1) * limit)
    //   .limit(limit * 1);

    // Get total number of pages
    const docCount = await Recipe.countDocuments(filter);
    const totalPage = Math.ceil(docCount / limit);

    // Return results
    res.status(200).json({
      data: query,
      currentPage: page,
      totalPage: totalPage,
    });
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

//get liked recipes, sorted by createdAt descending
router.route("/like").get(checkAuth, async (req, res) => {
  // Set up pagination parameters
  var { page = 1, limit = 10 } = req.query;
  // Convert pagination parameters to Number
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  try {
    // Set filter for userId in likes and published recipes
    const filter = {
      likes: req.userData.id,
      state: "published",
    };

    // Set fields that will be returned
    const fields = {
      cover: 1,
      title: 1,
      description: 1,
      content: 1,
      likesCount: 1,
    };

    // Get liked recipes sorted by createdAt descending
    const query = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .select(fields);
    //   .skip((page - 1) * limit)
    //   .limit(limit * 1);

    // Get total number of pages
    const docCount = await Recipe.countDocuments(filter);
    const totalPage = Math.ceil(docCount / limit);

    // Return results
    res.status(200).json({
      data: query,
      currentPage: page,
      totalPage: totalPage,
    });
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

//Get profile
router.route("/profile").get(checkAuth, (req, res) => {
  //Set fields that are needed: username and profile picture
  const fields = { username: 1, profilePicture: 1 };

  //Return profile: username and profile picture
  User.findById(req.userData.id)
    .select(fields)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json("Error: " + err));
});

//signup
router.route("/signup").post(jsonParser, async (req, res) => {
  //create new User
  //Turn email to lowercase since email is case insensitive
  console.log(req.body);
  const email = req.body.email.toLowerCase();
  const password = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;

  //check if user already exists
  const oldUser = User.find({ email: email });
  if ((await oldUser).length >= 1) {
    res.status(400).json("User already exists");
  } else {
    //save new user
    const newUser = new User({ email, password, username });
    console.log(newUser);
    newUser
      .save()
      .then(() => res.status(200).json("Sign up successful"))
      .catch((err) => res.status(500).json("Error: " + err));
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //email is case insensitive
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      //login failed
      res.status(401).json("Incorrect email or password");
    } else {
      //login successful, create JWT token
      const currentLoginTime = Date.now();
      const token = jwt.sign(
        { id: user._id, loginTime: currentLoginTime },
        process.env.JWT_SECRET
      );

      //Add current login time to prevent concurrent logins
      await user.updateOne({ $set: { currentLoginTime: currentLoginTime } });

      res.status(200).json({ message: "Login successful", token: token });
    }
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

//update user profile image
router.route("/update").put(checkAuth, async (req, res) => {
  // If no field, replace with empty
  const profilePicture = req.body.profilePicture ? req.body.profilePicture : "";

  try {
    const user = await User.findById(req.userData.id);
    await user.updateOne({ $set: { profilePicture: profilePicture } });

    // User profile image updated
    res.status(200).json("User profile image updated");
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

//delete user by id, also remove his recipes and likes history
router.route("/delete").put(checkAuth, async (req, res) => {
  try {
    // Delete recipes authored by this user
    await Recipe.deleteMany({ userId: req.userData.id });

    // Remove user like records
    await Recipe.updateMany({}, { $pull: { likes: req.userData.id } });
    // Update likesCount
    await Recipe.updateMany({}, [
      { $set: { likesCount: { $size: "$likes" } } },
    ]);

    // Remove user comment records
    await Recipe.updateMany(
      {},
      { $pull: { comments: { userId: req.userData.id } } }
    );
    // Update commentsCount
    await Recipe.updateMany({}, [
      { $set: { commentsCount: { $size: "$comments" } } },
    ]);

    // Delete user
    await User.findByIdAndDelete(req.userData.id);

    res.status(200).json("User deleted");
  } catch (err) {
    //unknown error
    res.status(500).json("Error: " + err);
  }
});

module.exports = router;
