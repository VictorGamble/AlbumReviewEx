const express = require('express');
const router = express.Router();
const userModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/signup', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'express',
    },
    partials: {
      partial: 'partial-signup'
    }
  })
});

router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'express',
    },
    partials: {
      partial: 'partial-login'
    }
  })
});

router.post('/login', function (req, res, next) {
  console.log(req.body)
  const {
    email,
    password
  } = req.body;

  const user = new userModel(null, null, null, email, password);
  user.loginUser();
  res.sendStatus(200);
})

router.post('/signup', function (req, res, next) {
  const {
    first_name,
    last_name,
    email,
    password
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new userModel(null, first_name, last_name, email, hash);
  console.log("USER IS: ", user);
  user.addUser();
  res.sendStatus(200);
});

module.exports = router;