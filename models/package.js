/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         January 2016
-----------------------------------------------------------------------------*/

var dbConfig = {
    client: 'mysql',
    debug: true,
    connection: {
        host     : 'localhost',
        user     : 'express',
        password : 'butranco',
        database : 'adce',
        charset  : 'utf8'
    }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;
