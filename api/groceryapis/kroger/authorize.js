const express = require('express');
const authCheck = require('../../middleware/auth-check');

const router = express.Router();

// user authenticated through browser sign in - returns token for API access
// TODO: Try using through webview in react native app to send headers
router.get('/', (req, res) => {
  const authorizeUrl =
    process.env.KROGER_BASE_URL +
    'connect/oauth2/authorize' +
    '?scope=product.compact profile.compact cart.basic:write' +
    '&client_id=' + process.env.CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URI) +
    '&response_type=code'

  return res.redirect(authorizeUrl);
  return res.status(400).json({ message: 'Failed to Authenticate Kroger Customer' });
})

module.exports = router;