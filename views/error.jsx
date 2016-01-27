var React = require('react');
var DefaultLayout = require('./default');

var ErrorView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                <div>
                <p>{this.props.message}</p>
                </div>
            </DefaultLayout>
        );
    }
});

module.exports = ErrorView;
