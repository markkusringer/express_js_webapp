var React = require('react');

var MyFormComponent = React.createClass({
    render: function() {
        return (
            <form action={this.props.action} {...this.props}>
                {this.props.children}
            </form>
        );
    }
});

MyFormComponent.Row = React.createClass({
    render: function() {
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
});

MyFormComponent.Label = React.createClass({
    propTypes: {
        labelName: React.PropTypes.node.isRequired,
    },
    getDefaultProps: function() {
        return {
            labelName: 'Default Label'
        };
    },
    render: function() {
        return (
            <label labelFor="label">{this.props.labelName}</label>
        );
    }
});

MyFormComponent.PasswordInput = React.createClass({
    render: function() {
        return <input type="password" defaultValue={this.props.value} />
    }
});

MyFormComponent.Input = React.createClass({
    render: function() {
        return <input type="text" defaultValue={this.props.value} />
    }
});

MyFormComponent.Field = React.createClass({
    render: function() {
        return (
            <MyFormComponent.Row>
                <MyFormComponent.Label {...this.props} />
                <MyFormComponent.Input {...this.props} />
            </MyFormComponent.Row>
        );
    }
});

module.exports = MyFormComponent;
