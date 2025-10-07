const express=require('express')

const protectRoute = require("../middleware/auth");
const authController=require('../controllers/authController');
const upload = require('../utils/upload');
 const router=express();
router.post('/signup',authController.signup)

router.post('/login',authController.login)

router.put("/update-profile", protectRoute,upload.single("image") ,authController.updateProfile);


module.exports=router;