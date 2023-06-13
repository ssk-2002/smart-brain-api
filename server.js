const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser! So we don't need this actually, but still fine
const bcrypt = require('bcrypt-nodejs');  // helps in encrypting passwords in a secure manner
const cors = require('cors');  // CORS (Cross-Origin Resource Sharing) in React is a browser security mechanism that allows web applications to make requests to different domains while enforcing restrictions to protect users.
const knex = require('knex');  // a NPM package that helps us in connecting databse to our server 

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here: So, we need to provide our details that we used to create an account 
  client: 'pg',
  connection: {
    host : '127.0.0.1',  // localhost
    user : 'postgres',
    password : 'root',  // in case you didn't created any password for your database
    database : 'smart-brain'  // name of the database
  }
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!


// here these end points simple receive the informartion from browser and pass it to the appropriate handlers to keep it cleaner => Make sure ypu pass the information each handler needs 
app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})