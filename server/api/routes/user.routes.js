const express = require('express');
const { user } = require('../controllers');
const { authUtil } = require('../utils');

const router = express.Router();

// authentication
router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

// private routes
router.get('/test', (req, res) => res.json({ msg: 'user Works' }));
router.put('/userInfo', user.updateUserInfo);
router.put('/userInfoById', user.updateUserInfoById);
router.get('/users', user.getUsers);
router.get('/team', user.getUsersInTeam);
router.get('/', user.getUserById);
router.delete('/', user.deleteUser);
module.exports = router;
