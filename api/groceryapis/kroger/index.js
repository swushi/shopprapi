const router = require('express').Router();

const idenityRouter = require('./identity');
const productsRouter = require('./products');
const authorizeRouter = require('./authorize');
const callbackRouter = require('./callback');
const accessTokenRouter = require('./access-token');

router.use('/identity', idenityRouter);
router.use('/products', productsRouter);
router.use('/authorize', authorizeRouter);
router.use('/callback', callbackRouter);
router.use('/accesstoken', accessTokenRouter);

module.exports = router;
