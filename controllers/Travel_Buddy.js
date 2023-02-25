const express = require('express')
const router = express.Router()
const Travel = require('../models/Travel_Buddy.js')
const bagels = require('../seedData/data.js')
const travelSeed = require('../seedData/data.js')
const isAuthenticated = require('../utilities/middleware.js')
router.use(isAuthenticated)


router.get('/', (req, res) => {
    res.render('menus/index.ejs')
})

router.get('/seed', (req, res) => {
    Travel.create(travelSeed, (err, data) => {
        if (err) {
            console.log(err, ':ERROR AT SEED ROUTE')
        } else {
            console.log('DATABASE SEEDED SUCCESSFULLY', data)
            res.redirect('/travel')
        }
    })
})

router.get('/categorie1', (req, res) => {
    res.render('menus/index_2.ejs')
})

router.get('/bagels/new', (req, res) => {
    res.render('new.ejs')
})

router.get('/bagels', (req, res) => {
    Travel.find({}, (err, food) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('./categories/index_1.ejs', {
                bagels: food
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Travel.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('show.ejs', {
                bagels: foundShop
            })
        }
    })
})

router.get('/:id/edit', (req, res) => {
    Travel.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err, ':ERROR WITH EDIT ROUTE')
        } else {
            res.render('edit.ejs', {
                bagels: foundShop,
                currentUser: req.session.currentUser
            })
        }
    })
})

router.post('/bagels', (req, res) => {
    Travel.create(req.body, (err, createdShop) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.redirect('/travel/bagels')
        }
    })
})

router.delete('/:id', (req, res) => {
    Travel.findByIdAndDelete(req.params.id, (err, shop) => {
        if (err) {
            console.log(err, '- ERROR AT DELETE ROUTE')
        } else {
            res.redirect('/travel/bagels')
        }
    })
})

router.put('/:id', (req, res) => {
    Travel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShop) => {
        if (err) {
            console.log(err, ':ERROR AT PUT ROUTE')
            console.log(req.body)
        } else {
            res.redirect('/travel/bagels')
        }
    })
})


router.put('/:id/upvote', (req, res) => {
    Travel.findByIdAndUpdate(req.params.id, { $inc: { upvote: 1 } }, (err, UPVOTE) => {
        if (err) { console.log(err, 'ERROR AT VOTE ROUTE') }
        else {
            res.redirect('/travel/bagels')
        }
    })
})

router.put('/:id/downvote', (req, res) => {
    Travel.findByIdAndUpdate(req.params.id, { $inc: { downvote: 1 } }, (err, DOWNVOTE) => {
        if (err) { console.log(err, 'ERROR AT VOTE ROUTE') }
        else {
            res.redirect('/travel/bagels')
        }
    })
})



module.exports = router