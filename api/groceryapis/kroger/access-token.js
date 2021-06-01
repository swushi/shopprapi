const express = require('express');
const fetch = require('node-fetch');
const authCheck = require('../../middleware/auth-check');
const { base64 } = require('../../utils');

const router = express.Router();

router.get('/', authCheck, async (req, res) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
  const { code } = req.body;

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
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error);
  }
})

module.exports = router;