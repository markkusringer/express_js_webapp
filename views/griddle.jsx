var DefaultLayout = require('./default');
var React = require('react');

var GriddleView = React.createClass({
  render: function() {
    var items = "var items = " + this.props.items;
    return (
        <DefaultLayout title={this.props.title}>
            <script dangerouslySetInnerHTML={{__html: items}} />
            <div id={this.props.content_id}></div>
            <script type="text/javascript" src="/bundle.js"></script>
        </DefaultLayout>
    );
  }
});

module.exports = GriddleView;
