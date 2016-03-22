var React = require('react');
var DefaultLayout = require('./default');

var FormView = React.createClass({
    render: function() {
        return (
            <DefaultLayout title={this.props.title}>
                <form method="post">
                    <div className="fields" dangerouslySetInnerHTML={{__html:this.props.form_html}} />
                    <button value="submit">SEND</button>
                </form>
            </DefaultLayout>
        );
    }
});

module.exports = FormView;
