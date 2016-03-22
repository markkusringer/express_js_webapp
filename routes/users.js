var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
var bookshelf = require('../models/include.js');

/* GET users list */
router.get('/', function(req, res, next) {
    // Fetch all users
    bookshelf.model('User').fetchAll().then(function(users){
        res.render('griddle', {
            title: 'Express',
            content_id: 'users',
            items: JSON.stringify(users)
        });
    }).catch(function(err) {
        console.error(err);
    });
});

/* GET users/create */
router.get('/create', function(req, res, next) {
    var schema = require('../schemas/user.js');
    schema.form.handle(req, {
        empty: function (form) {
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
});

/* POST users/create */
router.post('/create', function(req, res, next) {
    var schema = require('../schemas/user.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            var User = bookshelf.model('User');
            var userData = schema.adaptData(form.data);
            new User(
                userData
            ).save().then(function(model) {
                console.log("SAVED");
                res.render('form_view', { form_html: form.toHTML() });
            });
        },
        error: function (form) {
            // the data in the request didn't validate,
            // calling form.toHTML() again will render the error messages
            console.log("error");
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
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
    var schema = require('../schemas/user.js');
    console.log(util.inspect(schema));
    var User = bookshelf.model('User');
    new User({id: Number(req.params.id)})
        .fetch()
        .then(handleRequest);
    function handleRequest(user) {
        schema.form.handle(req, {
            empty: function (form) {
                res.render('form_view', { form_html: form.bind(user.toJSON()).toHTML() });
            }
        });
    }
});

/* POST users/update/:id */
router.post('/update/:id', function(req, res, next) {
    var schema = require('../schemas/user.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            var User = bookshelf.model('User');
            console.log(util.inspect(schema));
            var userData = schema.adaptData(form.data);
            userData["id"] = req.params.id;
            var user = new User(
                userData
            ).save().then(function(model) {
                console.log("SAVED");
                res.render('form_view', { form_html: form.toHTML() });
            });
        },
        error: function (form) {
            // the data in the request didn't validate,
            // calling form.toHTML() again will render the error messages
            console.log("error");
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
});

/* GET users/:id */
router.get('/:id', function(req, res, next) {
    res.send('respond with a single user');
});

module.exports = router;
