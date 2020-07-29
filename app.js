const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.route');
const indexRoutes = require('./routes/index.route');

const corsConfig = { origin: process.env.CLIENT_ORIGIN, credentials: true };
app.use(cors(corsConfig));

/**
 * Database connection
 */
mongoose.connect(process.env.DATABASE_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: process.env.SESSION_COLLECTION_NAME,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    name: process.env.COOKIE_NAME,
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      path: process.env.COOKIE_PATH,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE),
    },
  }),
);

connection.once('open', () => {
  console.log('🔌 MongoDB database connection established with success ');
});

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', indexRoutes);

module.exports = app;
