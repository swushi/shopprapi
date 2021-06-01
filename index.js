require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const fetch = require('node-fetch');

const userRouter = require('./api/routes/user');
const signupRouter = require('./api/routes/signup');
const loginRouter = require('./api/routes/login');
const krogerRouter = require('./api/groceryapis/kroger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/kroger', krogerRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🌟`)
})
