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

const corsConfig = { origin: 'http://localhost:3000', credentials: true };
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
  collection: 'sessions',
});

app.use(
  session({
    secret: 'secret-to-change',
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    name: 'auth',
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
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
