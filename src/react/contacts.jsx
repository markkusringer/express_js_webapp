var React = require('react');
var ReactDOM = require('react-dom');
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

if( document.getElementById('contacts') )
    ReactDOM.render(
        <Griddle
            results={items}
            showFilter={true}
            columnMetadata={columnMeta}
            resultsPerPage={20}
            enableInfiniteScroll={false}
            onRowClick={function(r) {}}
            bodyHeight={800}
            useFixedHeader={true}/>,
        document.getElementById('contacts')
    );
