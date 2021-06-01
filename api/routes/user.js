const express = require('express');
const { getAllUsers, updateUser, getUser } = require('../controllers/user');
const router = express.Router();
const db = require('../db');
const authCheck = require('../middleware/auth-check');

router.get('/', authCheck, getAllUsers);
router.put('/:userid', authCheck, updateUser);
router.get('/:userid', authCheck, getUser);

module.exports = router;