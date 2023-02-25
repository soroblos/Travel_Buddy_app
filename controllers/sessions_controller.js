const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
// const popup = require('popups')
const alert = require('alert')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err)
            alert('Sorry,please try again.')
        } else if (!foundUser) {
            alert('Sorry,please try again.')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/travel')
            } else {
                alert('Sorry,please try again.')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => res.redirect('/travel'))
})

module.exports = sessions