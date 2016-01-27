var React = require('react');

var MyFormComponent = React.createClass({
    render: function() {
        return (
            <form action={this.props.action}>
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
    render: function() {
        return (
            <label labelFor="label">{this.props.labelName}</label>
        );
    }
});

MyFormComponent.Input = React.createClass({
    render: function() {
        return (
            <input value="" />
        );
    }
});

module.exports = MyFormComponent;
