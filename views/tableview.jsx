var React = require('react');
var Table = require('./table');

var TableView = React.createClass({
  render: function() {
    return (
        <div>
        <Table>
            <Table.Row>
                <Table.Column columnData={this.props.columnData} />
            </Table.Row>
        </Table>
        </div>
    );
  }
});


module.exports = TableView;
