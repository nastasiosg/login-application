const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

router.post('/sign-up', (req, res) => {
  db.query(
    // db.escape for untrusted strings
    `SELECT id FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)})`,
    (err, result) => {
      if (result.length) {
        return res.status(400).send({
          msg: 'Email is already in use'
        });
      } else { // email not in use
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
              return res.status(400).send({
                msg: err
              });
            } else { // password already hashed then add to database
              db.query(
                `INSERT INTO users (id, email, first_name, country, password, registered) VALUES ('${uuid.v4()}', 
                ${db.escape(req.body.email)}, ${db.escape(req.body.first_name)}, ${db.escape(req.body.country)},'${hash}', now());`,
                (err) => {
                  if(err, result) {
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
      }
    }
  );
});

router.post('/login', (req, res) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)}`,
    (err, result) => {
      // User doesn't exist
      if(err) {
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(400).send({
          msg: 'Email or password incorrect!'
        });
      }
      // Check/Compare password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(400).send({
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            // password match
            const token = jwt.sign({
              email: result[0].email,
              emailId: result[0].id
            },
            'SECRETKEY', {
              expiresIn: '2d'
            }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}';`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(400).send({
            msg: 'Email or password is incorrect!'
          });
        }
      );
    }
  )
});

router.put('/country-update/:id', (req, res, next) => {
  db.query(
    `UPDATE users SET country = ${db.escape(req.body.country)} WHERE id = ${db.escape(req.body.id)}`
  )
  next()
  return res.status(200).send({
    msg: 'Country Updated!'
  })
})

router.get('/secret-route', userMiddleware.isLoggedIn, (req) => {
  console.log(req.userData);
});

module.exports = router;
