/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         January 2016
-----------------------------------------------------------------------------*/
var bookshelf = require('./package.js');
require('./countries');

module.exports = bookshelf.model('Contact', {
    tableName: 'contact',
    country: function() {
        return this.belongsTo('Country');
    }
});
