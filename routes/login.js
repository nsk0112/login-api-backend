const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/api/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password;
  // console.log(username, password);

  try {
    await models.user.findOne({ where: { 'username': username }, }).then(async user => {
      if (user == null) {
        return res.json({ message: "Invalid Credentials" })
      };
      let validatePassword = await bcrypt.compare(password, user.password);
      console.log(validatePassword);
      if (!validatePassword) {
        return res.json({ message: "Invalid Credentials" })
      }

      else {
        res.json({ message: 'Login successful' })
      }
    });
  }
  catch (err) {
    res.json({ message: err.message })
  }

})

module.exports = router;
