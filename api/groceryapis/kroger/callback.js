const express = require('express');
const db = require('../../db');

const router = express.Router();

router.get('/', (req, res) => {
  const code = req.query.code;
  if (code) {
    return res.status(200).json({ message: 'Successfully Authorized to use Kroger', code: code })
  }
  return res.status(400).json({ message: 'Failed to Authorize with Kroger' })
})

module.exports = router;