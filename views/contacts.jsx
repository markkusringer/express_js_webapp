var React = require('react');
var DefaultLayout = require('./default');

var ContactsView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                <p>All contacts</p>
                <div>
                    <p>{this.props.count}</p>
                    <p>{this.props.time}</p>
                    <p>{JSON.stringify(this.props.contacts)}</p>
                </div>
            </DefaultLayout>
        );
    }
});

module.exports = ContactsView;
