/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         January 2016
-----------------------------------------------------------------------------*/
var bookshelf = require('./package.js');

module.exports = bookshelf.model('User', {
    tableName: 'users'
});
