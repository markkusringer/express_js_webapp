var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
var bookshelf = require('../models/include.js');

/* GET contacts list */
router.get('/', function(req, res, next) {
    // Fetch all contacts
    bookshelf.model('Contact').fetchAll().then(function(contacts){
        res.render('griddle', { title: 'Express', contacts: contacts.toJSON()});
    }).catch(function(err) {
        console.error(err);
    });
});

/* GET contacts/create */
router.get('/create', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    var Country = bookshelf.model('Country');
    var countryData = {};
    Country.fetchAll().then(function(countries) {
        _.each(countries.toJSON(), function(country) {
            countryData[country.id] = country.name_en;
        });
        schema.form.fields.country_id.choices = countryData;
        schema.form.handle(req, {
            empty: function (form) {
                res.render('form_view', { form_html: form.toHTML() });
            }
        });
    });
});

/* POST contacts/create */
router.post('/create', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            var Contact = bookshelf.model('Contact');
            var contactData = schema.adaptData(form.data);
            new Contact(
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

/* GET contacts/update/:id */
router.get('/update/:id', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    var Contact = bookshelf.model('Contact');
    new Contact({id: Number(req.params.id)})
        .fetch()
        .then(handleRequest);
    function handleRequest(contact) {
        var Country = bookshelf.model('Country');
        var countryData = {};
        Country.fetchAll().then(function(countries) {
            _.each(countries.toJSON(), function(country) {
                countryData[country.id] = country.name_en;
            });
            schema.form.fields.country_id.choices = countryData;
            schema.form.handle(req, {
                empty: function (form) {
                    res.render('form_view', { form_html: form.bind(contact.toJSON()).toHTML() });
                }
            });
        });
    }
});

/* POST contacts/update/:id */
router.post('/update/:id', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            var Contact = bookshelf.model('Contact');
            var contactData = schema.adaptData(form.data);
            contactData["id"] = req.params.id;
            new Contact(
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
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
});

/* GET contacts/:id */
router.get('/:id', function(req, res, next) {
    res.send('respond with a single user');
});

module.exports = router;
