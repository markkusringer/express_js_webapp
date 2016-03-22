var DefaultLayout = require('./default');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');

var GriddleView = React.createClass({
  render: function() {
    var contacts = "var contacts = " + JSON.stringify(this.props.contacts);
    return (
        <DefaultLayout title={this.props.title}>
            <script dangerouslySetInnerHTML={{__html: contacts}} />
            <div id="content"></div>
            {0?"":<script type="text/javascript" src="/bundle.js"></script>}
        </DefaultLayout>
    );
  }
});

module.exports = GriddleView;
