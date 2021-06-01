const express = require('express');
const authCheck = require('../../middleware/auth-check');

const router = express.Router();

router.get('/', authCheck, (req, res) => {
  return res.status(400).json({ message: 'Failed to get Kroger ID' });
})

module.exports = router;