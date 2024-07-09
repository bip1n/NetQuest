// Import required modules
const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const loginLimiter = require('../middleware/loginLimiter');
const upload = require("../middleware/multer");


// Define route for user registration
router.post('/register', upload.fields([]), authCtrl.register_user);

// Define route for user login
router.post('/login', loginLimiter, authCtrl.login);
router.post('/loginadmin', loginLimiter, authCtrl.login_admin);

// Define route for admin registration with file upload handling
router.post('/adminregister', upload.fields([
  { name: 'images', maxCount: 6 },
  { name: 'video', maxCount: 1 }
]), authCtrl.register_admin);

router.post('/resetPass', authCtrl.resetPass);

// Export the router to be used in other parts of the application
module.exports = router;
