var express = require('express');
var router = express.Router();
var _ = require('underscore');
var util = require('util');
var bookshelf = require('../models/include.js');

/* GET contacts list */
router.get('/', function(req, res, next) {
    // Fetch all contacts
    var Contact = bookshelf.model('Contact');
        Contact.forge()
        .query(function(qb) {
            //qb is knex query builder, use knex function here
            qb.offset(0).limit(1500);
        })
        .fetchAll({
            withRelated: [{
                country: function (qb) {
                    qb.column('id','name_en');
                },
            }]
        })
        .then(function(contacts){
            res.render('list', {
                title: 'Express',
                content_id: 'contacts',
                items: JSON.stringify(contacts)
            });
            res.end();
        }).catch(function(err) {
            console.error(err);
            res.end();
        });
});

/* GET contacts/create */
router.get('/create', function(req, res, next) {
    console.log("GET /create");
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
                res.render('form', { form_html: form.toHTML() });
            }
        });
    });
});

/* POST contacts/create */
router.post('/create', function(req, res, next) {
    console.log("POST /create");
    var schema = require('../schemas/contact.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            //console.log("success");
            var Contact = bookshelf.model('Contact');
            var contactData = schema.adaptData(form.data);
            new Contact(contactData)
                .save()
                .then(function(model) {
                    console.log("SAVED");
                    res.render('form', { form_html: form.toHTML() });
                });
        },
        error: function (form) {
            // the data in the request didn't validate,
            // calling form.toHTML() again will render the error messages
            console.log("error");
            res.render('form', { form_html: form.toHTML() });
        }
    });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    // do validation on name here
    var Contact = bookshelf.model('Contact');
    new Contact({id: id})
        .fetch()
        .then(function(contact) {
            if( contact ) { // once validation is done save the new item in the req
                req.contact = contact;
                next();
            } else {
                res.redirect("/");
            }
        });
});

/* GET contacts/update/:id */
router.get('/update/:id', function(req, res, next) {
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
                res.render('form', { form_html: form.bind(req.contact.toJSON()).toHTML() });
            }
        });
    });
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
                res.render('form', { form_html: form.toHTML() });
            });
        },
        error: function (form) {
            // the data in the request didn't validate,
            // calling form.toHTML() again will render the error messages
            console.log("error");
            res.render('form', { form_html: form.toHTML() });
        }
    });
});

/* GET contacts/:id */
router.get('/:id', function(req, res, next) {
    res.send('respond with a single user');
});

module.exports = router;
