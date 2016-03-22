/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         March 2016
-----------------------------------------------------------------------------*/
var ContactType = function(id, name) {
    this.id = id;
    this.name = name;
    return this;
}

ContactType.prototype.getId = function() { return this.id; }
ContactType.prototype.toString = function() { return this.getName(); }
ContactType.prototype.getName = function() { return this["name"] }

var __contacttypes = {};

var __contacttypes_list = [
    new ContactType(1,"Creative / Art Director / Designer"),
    new ContactType(2,"Student"),
    new ContactType(3,"Press"),
    new ContactType(4,"Other")
];

for (var i=0; i < __contacttypes_list.length; i++)
    __contacttypes[__contacttypes_list[i].id] =  __contacttypes_list[i];

ContactType.get = function(id) {
    return __contacttypes[id]
}

ContactType.getByName = function(name) {
    var found = null;
    for (var i=0; i < __contacttypes_list.length; i++) {
        if( __contacttypes_list[i].name == String(name).trim() ) {
            found = __contacttypes_list[i];
            break;
        }
    }
    return found;
}

ContactType.select = function () {
    return __contacttypes_list;
}

ContactType.toJSON = function() {
    return __contacttypes;
}

module.exports = ContactType;
