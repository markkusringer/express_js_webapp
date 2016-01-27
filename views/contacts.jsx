var React = require('react');
var DefaultLayout = require('./default');

var ContactsView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                <div>
                    <p>All contacts</p>
                    <p>{this.props.contacts}</p>
                </div>
            </DefaultLayout>
        );
    }
});

module.exports = ContactsView;


