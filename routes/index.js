var express = require('express');
var router = express.Router();

// TODO: Should include a common file where all models are required
var bookshelf = require('../models/package.js');
require('../models/users.js');
require('../models/contacts.js');
require('../models/countries.js');

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
    res.render('sample_form', { title: 'Express', action: "post", labelName: "label" });
});

/* GET contacts. */
router.get('/contacts', function(req, res, next) {
    // Fetch all contacts
    /*Contact.fetchAll().then(function(contacts){
        res.render('contacts', { title: 'Express', contacts: JSON.stringify(contacts) });
    });*/

    var Country = bookshelf.model('Country');

    // Fetch contacts by country
    Country.where('name_en', 'Spain').fetch({withRelated: ['contacts']}).then(function(country) {
        res.render('index', { title: 'Express', users: JSON.stringify(country.related('contacts')) });
    }).catch(function(err) {
        console.error(err);
    });
});

module.exports = router;
