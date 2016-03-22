var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
var bookshelf = require('../models/include.js');

/* GET users list */
router.get('/', function(req, res, next) {
    // Fetch all users
    bookshelf.model('User').fetchAll().then(function(contacts){
        res.render('griddle', { title: 'Express', contacts: contacts.toJSON()});
    }).catch(function(err) {
        console.error(err);
    });
});

/* GET users/create */
router.get('/create', function(req, res, next) {
    res.send('respond with a form to create a user');
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    // do validation on name here
    console.log('doing id validations on ' + id);
    // once validation is done save the new item in the req
    if( Number(id) ) {
        req.id = Number(id);
        // go to the next thing
        next();
    } else {
        res.redirect("/");
    }
});

/* GET users/update/:id */
router.get('/update/:id', function(req, res, next) {
    var userForm = require('../schemas/user.js');
    var countryData = {};
    var User = bookshelf.model('User');
    new User({id: Number(req.params.id)})
        .fetch()
        .then(handleRequest);
    function handleRequest(user) {
        userForm.handle(req, {
            empty: function (form) {
                res.render('form_view', { form_html: form.bind(user.toJSON()).toHTML() });
            }
        });
    }
});

/* POST users/update/:id */
router.post('/update/:id', function(req, res, next) {
    var userForm = require('../schemas/user.js');
    userForm.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            //console.log(util.inspect(form.data));
            var Contact = bookshelf.model('Contact');
            var contactData = form.data;
            contactData["id"] = req.params.id;
            var contact = new Contact(
                contactData
            ).save().then(function(model) {
                console.log("SAVED");
                res.render('form_view', { form_html: form.toHTML() });
            });
        },
        error: function (form) {
            // the data in the request didn't validate,
            // calling form.toHTML() again will render the error messages
            console.log("error");
            //console.log(util.inspect(form.data));
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
});

/* GET users/:id */
router.get('/:id', function(req, res, next) {
    res.send('respond with a single user');
});

module.exports = router;
