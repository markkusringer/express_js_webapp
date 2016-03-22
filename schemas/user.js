/*-----------------------------------------------------------------------------


@author:        Marc Pérez Castells
@contact:       marc.perez@whads.com
@organization:  Whads Accent SL
@since:         March 2016
-----------------------------------------------------------------------------*/
var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;

var UserForm = forms.create({
    name: fields.string({ required: true }),
    email: fields.email({ required: true }),
    password: fields.password({ required: validators.required('You definitely want a password') }),
    confirm:  fields.password({
        required: validators.required('don\'t you know your own password?'),
        validators: [validators.matchField('password')]
    }),
    superadmin: fields.boolean(),
    admin: fields.boolean()
});

module.exports = UserForm;
