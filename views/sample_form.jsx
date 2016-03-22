var React = require('react');
var Form = require('./form');
var Hooks = require('./hooks');

// Mixins
var InputMethods = {
    methodA: function() {
        return <Form.Input value="MethodA"/>;
    },
    methodB: function() {
        return <Form.Input value="MethodB" />;
    }
}

var SomeInput = React.createClass({
    mixins: [InputMethods],
    methodC: function() {
//         Define method C for vehicle
    },
    render: function() {
        return (
            <Form.Row>
                <p>Bingo</p>
                {this.methodA()}
            </Form.Row>
        );
    }
});

var OtherInput = React.createClass({
    mixins: [InputMethods],
    methodC: function() {
//         Define method C again for airplane
    },
    render: function() {
        return (
            <div>
                <Form.Input value="NormalInput" />
                <Hooks.Input value="HooksInput" noDefault={true} />
            </div>
        );
    }
});

var MyForm = React.createClass({
    render: function() {
        var fields = this.props.fields;
        return (
            <div>
            <SomeInput />
            <Form action={this.props.action}>
                <Form.Row>
                    <Form.Label labelName={this.props.labelName} />
                    <Form.Input {...this.props} />
                </Form.Row>
                <Form.Field {...this.props} />
                {
                    fields.map(function(fieldData) {
                        return <Form.Field labelName={fieldData.labelName} value={fieldData.inputValue} />;
                    })
                }
                <Form.Row>
                    <Form.Label labelName="PasswordLabel" />
                    <Form.PasswordInput {...this.props} />
                </Form.Row>
            </Form>
            <Form.Row>
                <Form.Label labelName={this.props.labelName} />
                <Form.Input noDefault={true} />
            </Form.Row>
            </div>
        );
    }
});


module.exports = MyForm;
