// Import required modules
const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const loginLimiter = require('../middleware/loginLimiter');
const upload = require("../middleware/multer");

router.post('/register', upload.fields([]), authCtrl.register_user);
router.post('/login', loginLimiter, authCtrl.login);
router.post('/loginowner', loginLimiter, authCtrl.login_owner);
router.post('/register-admin', authCtrl.register_admin);
router.post('/login-admin', authCtrl.login_admin);
router.post('/resetPass', authCtrl.resetPass);
router.post('/ownerregister', upload.fields([{ name: 'images', maxCount: 6 },{ name: 'video', maxCount: 1 }]), authCtrl.register_owner);

module.exports = router;
