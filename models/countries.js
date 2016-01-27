/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         January 2016
-----------------------------------------------------------------------------*/
var bookshelf = require('./package.js');
require('./contacts');

module.exports = bookshelf.model('Country', {
    tableName: 'country',
    contacts: function() {
        return this.hasMany('Contact');
    }
});
