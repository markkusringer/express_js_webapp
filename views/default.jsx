var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
            <link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />
            <script dangerouslySetInnerHTML={{__html: `
              // google analtyics
              // is a common use
            `}} />
        </head>
        <body>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <nav>
                        <ul>
                        {
                            ['/contacts','/users'].map(function(option){
                                return (<li><a href={option}>{option}</a></li>);
                            })
                        }
                        </ul>
                    </nav>
                    {this.props.children}
                </div>
            </div>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;

