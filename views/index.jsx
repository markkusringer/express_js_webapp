var React = require('react');
var DefaultLayout = require('./default');

var IndexView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                <div>
                    <p>Hello!</p>
                    <p>{this.props.users}</p>
                </div>
            </DefaultLayout>
        );
    }
});

module.exports = IndexView;

