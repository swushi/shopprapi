const express = require('express');
const router = express.Router();
const db = require('../db');
const authCheck = require('../middleware/auth-check');

router.get('/', authCheck, (req, res) => {
  db.query('SELECT * FROM users ORDER BY userid', [], (error, result) => {
    if (error) {
      throw error;
    }

    res.status(200).json(result.rows);
  })
})

router.put('/:userid', (req, res) => {
  const { userid } = req.params;
  const { email, password, kroger_token } = req.body;
  db.query(
    'UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), kroger_token = COALESCE($3, kroger_token) WHERE userid = $4',
    [email, password, kroger_token, userid],
    (error, result) => {
      if (error) {
        throw error;
      }

      res.status(200).json(result.rows);
    })
})

module.exports = router;