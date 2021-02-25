const router = require('express').Router();
const { getUsers } = require('../controller/user.controller')

router.get('/', getUsers);

module.exports = router;