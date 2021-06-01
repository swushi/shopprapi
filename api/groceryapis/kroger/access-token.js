const express = require('express');
const fetch = require('node-fetch');
const db = require('../../db');
const authCheck = require('../../middleware/auth-check');
const { base64 } = require('../../utils');

const router = express.Router();

router.get('/', authCheck, async (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
  const { code } = req.body;
  const { userId } = req.userData;

  const tokenUrl = process.env.KROGER_BASE_URL + 'connect/oauth2/token';

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
      })
    });

    const data = await response.json()

    // populate kroger_details table
    const { refresh_token, access_token } = data;

    db.query('INSERT INTO kroger_details (userid, refresh_token, access_token) VALUES ($1, $2, $3);',
      [userId, refresh_token, access_token],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ message: 'Failed to fetch user', error })
        } else {
          return res.status(200).json({ message: 'Successfully received kroger access token' });
        }
      })
  } catch (error) {
    return res.status(400).json(error);
  }
})

module.exports = router;