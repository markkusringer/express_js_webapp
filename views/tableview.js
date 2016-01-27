var React = require('react');
var FixedDataTable = require('fixed-data-table');

var TableView = React.createClass({
    render: function() {
        return (
            <FixedDataTable.Table
                rowHeight={50}
                rowsCount={this.props.rows.length}
                width={5000}
                height={5000}
                headerHeight={50}>
                    <FixedDataTable.Column
                        header={<FixedDataTable.Cell>Col 1</FixedDataTable.Cell>}
                        cell={<FixedDataTable.Cell>Column 1</FixedDataTable.Cell>}
                        width={2000}
                    />
                    <FixedDataTable.Column
                        header={<FixedDataTable.Cell>Col 1</FixedDataTable.Cell>}
                        cell={<FixedDataTable.Cell>Column 1</FixedDataTable.Cell>}
                        width={2000}
                    />
                    <FixedDataTable.Column
                        header={<FixedDataTable.Cell>Col 1</FixedDataTable.Cell>}
                        cell={<FixedDataTable.Cell>Column 1</FixedDataTable.Cell>}
                        width={2000}
                    />
            </FixedDataTable.Table>
        );
    }
});

module.exports = TableView;
