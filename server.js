const express = require('express')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const db = mongoose.connection
const travelController = require('./controllers/Travel_Buddy.js')
const userController = require('./controllers/users.js')
const sessionController = require('./controllers/sessions_controller.js')
const Travel = require('./models/Travel_Buddy.js')


require('dotenv').config()

const PORT = process.env.PORT || 3003
const mongodbURI = process.env.MONGODBURI

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/travel', travelController)
app.use('/users', userController)
app.use('/sessions', sessionController)
app.get('/', (req, res) => {
    res.render('menus/app.ejs')
})


// Travel.deleteMany({}, function (err) {
//     console.log('collection removed')
// });

// Travel.findOneAndRemove({ name: 'Darkrai' }, (err, item) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('This ' + item + ' has been deleted')
//     }
// })

// Travel.find({ name: 'ESS-A-BAGEL' }, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })




mongoose.connect(`${mongodbURI}`, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));


// mongoose.connection.once('open', () => {
//     console.log('connected to mongo')
// })


app.listen(PORT, () => {
    console.log('listening')
})