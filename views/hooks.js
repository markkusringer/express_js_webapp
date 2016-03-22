var React = require('react');
var Form = require('./form');

module.exports = {
    Input: React.createClass({
        render: function() {
            if( this.props.noDefault )
                return (
                    <div>
                        <p>My No Default Input</p>
                        <Form.Input value={this.props.value} />
                    </div>
                );
            else
                return (<Form.Input value={this.props.value} />);
        }
    })
}
