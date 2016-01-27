var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <script dangerouslySetInnerHTML={{__html: `
              // google analtyics
              // is a common use
            `}} />
        </head>
        <body>
            {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;

