/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         March 2016
-----------------------------------------------------------------------------*/
var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;
var ContactType = require('./contacttype');

var ContactForm = forms.create({
    firstname: fields.string({ required: true }),
    lastname: fields.string({ required: true }),
    email: fields.email(),
    country_id: fields.number({
        choices: {},
        widget: widgets.select(),
        required: true
    }),
    contact_type_id: fields.number({
        choices: ContactType.toJSON(),
        widget: widgets.select(),
        required: true
    }),
    subscribed: fields.boolean({ required: true})
});

module.exports = ContactForm;
