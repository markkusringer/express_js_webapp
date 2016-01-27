var React = require('react');
var Form = require('./form');

var MyForm = React.createClass({
  render: function() {
    return (
        <div>
        <Form action={this.props.action}>
            <Form.Row>
                <Form.Label labelName={this.props.labelName} />
                <Form.Input />
            </Form.Row>
        </Form>
        <Form.Row>
            <Form.Label labelName={this.props.labelName} />
            <Form.Input />
        </Form.Row>
        </div>
    );
  }
});


module.exports = MyForm;
