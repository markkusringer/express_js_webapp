var React = require('react');
var Griddle = require('griddle-react');

var LinkComponent = React.createClass({
    render: function(){
        url ="/contacts/update/" + this.props.data;
        return <a href={url}>{this.props.data}</a>
    }
});

var columnMeta = [{
  "columnName": "id",
  "customComponent": LinkComponent
}];

React.render(
    <Griddle
        results={contacts}
        showFilter={true}
        columnMetadata={columnMeta}
        resultsPerPage={20}
        enableInfiniteScroll={false}
        onRowClick={function(r) {}}
        bodyHeight={800}
        useFixedHeader={true}/>,
    document.getElementById('content')
);
