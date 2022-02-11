const router = require('express').Router()
const UserControllers = require('../controllers/Users')

router.get('/getuser/:id', UserControllers.findUserById)
router.get('/getalluser', UserControllers.findAllUser)
router.post('/adduser', UserControllers.addUser)
router.put('/edituser/:id', UserControllers.editUserById)
router.delete('/deleteuser/:id', UserControllers.deleteUserById)

module.exports = router