var React = require('react');

var MyTable = React.createClass({
    render: function() {
        return (
            <table>
                {this.props.children}
            </table>
        );
    }
});

MyTable.Row = React.createClass({
    render: function() {
        return (
            <tr className="row">
                {this.props.children}
            </tr>
        );
    }
});

MyTable.Column = React.createClass({
    render: function() {
        return (
            <td className="column">
                {this.props.columnData}
            </td>
        );
    }
});

module.exports = MyTable;

