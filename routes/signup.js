const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

const salt = 10;

router.post('/api/signup', async (req, res) => {
  let userCount = await models.user.count();
  console.log(userCount);

  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  await models.user.create({
    username: req.body.username,
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword
  }).then((user) => {
    res.status(200).send({
      message: 'User was Registered successfully'
    });
  }).catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // res.status(403);
      res.send({ status: 'error', message: 'User already exists' });}
    // else{
    //   res.status(500);
    //   res.send({ status:'error', message: 'Something went wrong'});
    // }
    else {
        res.send({
          message: err.message
        })
      }
    })
});

module.exports = router;
