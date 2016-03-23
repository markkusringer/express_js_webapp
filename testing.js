/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         March 2016
-----------------------------------------------------------------------------*/

var bookshelf = require('./models/include.js');
var util = require('util');
var colors = require('colors');

var t1;
var t2;
var t3;
var Contact = bookshelf.model('Contact');
new Contact()
    .query(function(qb) {
        t1 = new Date().getTime();
//        qb.offset(0).limit(200);
    })
    .fetchAll()
    .then(function(items){
        console.log("bookshelf");
        showTime(t1,new Date().getTime())
        console.log(items.length);

        // Start KNEX Query
//        bookshelf.knex
//            .select()
//            .from('contact')
//            .limit(200)
//            .on("query", function(qb){
//                t2 = new Date().getTime();
//            })
//            .then(function(contacts){
//                console.log("knex");
//                showTime(t2,new Date().getTime())
//                for( var i=0; i<contacts.length; i++ ) {
//                    if( contacts[i].firstname )
//                        console.log(contacts[i].firstname.blue);
//                }
//            });
        items.forEach(function(contact){
            console.log(contact.country());
//            if( contact.country().get("name_en") )
//                console.log(contact.country().get("name_en"));
//            if( contact.get("firstname") )
//                console.log(contact.get("firstname").cyan);
        });
        bookshelf.knex.destroy();
    });

function showTime(t1,t2) {
    console.log(String(Math.round(t2 - t1) + " ms").green);
}
