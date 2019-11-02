const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'smart-brain',
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db) });

app.put('/image', (req, res) => { profile.getEntries(req, res, db) });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/*
  / --> res = this is working
  /signin/ --> POST success / fail
  /register/ --> POST user
  /profile/:userId --> GET user
  /image --> PUT user 
*/