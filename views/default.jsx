var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />
            <script dangerouslySetInnerHTML={{__html: `
              // google analtyics
              // is a common use
            `}} />
        </head>
        <body>
            <div className={"container"}>
                <div className={"wrapper"}>
                    {this.props.children}
                </div>
            </div>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;

