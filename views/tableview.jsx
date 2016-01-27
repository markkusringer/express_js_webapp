var React = require('react');
var DefaultLayout = require('./default');

var TableView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                {this.props.htmlData}
            </DefaultLayout>
        );
    }
});

module.exports = TableView;


