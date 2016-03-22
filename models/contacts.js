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
    virtuals: {
        fullName: function() {
            return this.get('firstname') + ' ' + this.get('lastname');
        }
    },
    hidden: [
        "subcontact_type_id",
        "subsubcontact_type_id",
        "data_source_id",
        "creation_time",
        "update_time",
        "subscribed",
        "verified",
        "bounced",
        "twitter",
        "linkedin",
        "phone",
        "signup_time",
        "member"
    ],
    country: function() {
        return this.belongsTo('Country');
    }
});
