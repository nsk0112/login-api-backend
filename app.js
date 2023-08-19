const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const signUp = require('./routes/signup');
const login = require('./routes/login');
const account = require('./routes/account');

const app = express();

let corsOptions = {
  origin: "http://localhost:3031"
};

// app.use(cors(corsOptions));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to food' })
})

// connect to db

const sequelize = new Sequelize("postgres://postgres:anka_vision@localhost:5481/Users_db");
sequelize.authenticate().then(() => {
  console.log('Database Connected Successfully')
}).catch((error) => {
  console.log('Database Connection Failed', error)
});

const db = require('./models');
const signup = require('./routes/signup');

db.sequelize.sync()
  .then(async () => {
    let hashedPassword = await bcrypt.hash("admin123", 10);
    console.log("Synced db.");
    // if(db.user.findOne({ where: {
    //   username: 'admin'
    // }})){
    await db.user.findOne({
      where: {
        username: "admin",
      }
    }).then(async user => {
      if (user == null) {
        db.user.create({
          username: "admin",
          password: hashedPassword
        })
      };
      // let validatePassword = await bcrypt.compare(hashedPassword, user.password);

      // if (!validatePassword) {
        
      // }

      // else {
      //   res.json({ message: 'Login successful' })
      // }
    })
    // }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.post('/api/signup', signUp);
app.post('/api/login', login);
app.get('/api/account/:id', account);




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
});
