var express = require('express');
var router = express.Router();
var React = require('react');
var _ = require('underscore');
var util = require('util');

// Include a common file where all models are required
var bookshelf = require('../models/include.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    // Fetch all Users
    /*User.fetchAll().then(function(users){
        res.render('index', { title: 'Express', users: JSON.stringify(users) });
    });*/
    // Fetch user by email
    /*User.where('email', req.query.email).fetch().then(function(users) {
        res.render('index', { title: 'Express', users: JSON.stringify(users) });
    }).catch(function(err) {
        console.error(err);
    });*/

    res.render('sample_form', {
        title: 'Express',
        action: "post",
        labelName:"MyLabel",
        inputValue:"MyValue",
        fields: [
            {
                labelName:"MyLabel 1",
                inputValue:"MyValue 1"
            },
            {
                labelName:"MyLabel 2",
                inputValue:"MyValue 2"
            },
            {
                labelName:"MyLabel 3",
                inputValue:"MyValue 3"
            }
        ]
    });
});

/* GET form page. */
router.get('/form/:id?', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    var Country = bookshelf.model('Country');
    var Contact = bookshelf.model('Contact');
    var countryData = {};
    var id = Number(req.params.id);
    if( id )
        new Contact({id: id})
            .fetch()
            .then(handleRequest);
    else
        handleRequest();
    function handleRequest(contact) {
        Country.fetchAll().then(function(countries) {
            _.each(countries.toJSON(), function(country) {
                countryData[country.id] = country.name_en;
            });
            schema.form.fields.country_id.choices = countryData;
            schema.form.handle(req, {
                empty: function (form) {
                    // there was no form data in the request
                    console.log("empty");
                    //console.log(contact.get("firstname"));
                    if( contact )
                        form = form.bind(contact.toJSON());
                    res.render('form_view', { form_html: form.toHTML() });
                }
            });
        });
    }
});

/* POST form page. */
router.post('/form/:id', function(req, res, next) {
    var schema = require('../schemas/contact.js');
    schema.form.handle(req, {
        success: function (form) {
            // there is a request and the form is valid
            // form.data contains the submitted data
            console.log("success");
            console.log(util.inspect(form.data));
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
            console.log(util.inspect(form.data));
            res.render('form_view', { form_html: form.toHTML() });
        },
        empty: function (form) {
            // there was no form data in the request
            console.log("empty");
            res.render('form_view', { form_html: form.toHTML() });
        }
    });
});

/* GET contacts. */
router.get('/columninfo', function(req, res, next) {

    // Fetch all contacts
    var Contact = bookshelf.model('Contact');
//    console.log("Contact tableName " + Contact.forge().tableName);

    bookshelf.knex(Contact.forge().tableName).columnInfo().then(function(info) {
//        console.log(JSON.stringify(info));
        _.each(info, function(value, key) {
            console.log(key)
            console.log(JSON.stringify(value));
        });
    });

    Contact.fetchAll().then(function(contacts){
        res.render('griddle', { title: 'Express', contacts: contacts.toJSON()});
    }).catch(function(err) {
        console.error(err);
    });

//    var Country = bookshelf.model('Country');

    // Fetch contacts by country
    /*Country.where('name_en', 'Spain').fetch({withRelated: ['contacts']}).then(function(country) {
        res.render('index', { title: 'Express', users: JSON.stringify(country.related('contacts')) });
    }).catch(function(err) {
        console.error(err);
    });*/

});

/* GET querytest. */
router.get('/querytest', function(req, res, next) {
    var Contact = bookshelf.model('Contact');
    var t1 = new Date().getTime();
    Contact.forge()
        .query(function(qb) {
            //qb is knex query builder, use knex function here
            qb.offset(0).limit(3000);
        })
        .fetchAll(/*{
            withRelated: [{
                country: function (qb) {
                    qb.column('id','name_en');
                },
            }]
        }*/).then(function(contacts){
            var t2 = new Date().getTime();
            var time = ((t2 - t1) / 1000);
            console.log(contacts.length);
            console.log(time + " sec.");
            res.render('contacts', {
                title: 'Express',
                contacts: contacts.toJSON(),
                time: time,
                count: contacts.length
            });
        });
});

module.exports = router;
