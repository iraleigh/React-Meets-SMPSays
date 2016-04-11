var React = require('react');
var ReactDOM = require('react-dom');

var ListContainer = React.createClass({
	handleOrderChange: function(order){
		if(order == 'popular'){
			this.getQuotesFromServer('http://www.zaphod.xyz/'+ api_key +'/search/quotes?popularity=desc');
		} else if (order == 'newest') {
			this.getQuotesFromServer('http://www.zaphod.xyz/'+ api_key +'/search/quotes');
		}
	},

	getQuotesFromServer: function(url){
		$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			success: function(results) {
				this.setState({quotes: results});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err.toString());
			}.bind(this)
		});
	},

	getInitialState: function(){
		return {
			quotes: []
		};
	},

	componentDidMount: function(){
		this.getQuotesFromServer(this.props.source);
	},

	componentWillUnmount: function(){
		this.quoteRequest.abort();
	},
	render: function(){
		return(
			<div>
			<OrderByPopularityButton onOrderChange={this.handleOrderChange} />
			<OrderByNewestButton onOrderChange={this.handleOrderChange} />
			<ListOfQuotes quotes={this.state.quotes} />
			</div>
		);
	}
});

var OrderByNewestButton = React.createClass({
	handleClick: function(){
		this.props.onOrderChange('newest');
	},
	render: function() {
		return (
			<button onClick={this.handleClick}>Order by Newest</button>
		);
	}
});


var OrderByPopularityButton = React.createClass({
	handleClick: function(){
		this.props.onOrderChange('popular');
	},
	render: function() {
		return (
			<button onClick={this.handleClick}>Order by Popularity</button>
		);
	}
});


var ListOfQuotes = React.createClass({


	render: function(){
		var quoteNodes = this.props.quotes.map(function(quote, index, quote_arr){
				return (
					<ListItem quote={quote.quotation} professor={quote.professor} key={quote.id}/>
				);
			});
		return (
			<div>{quoteNodes}</div>
		);
	}
});

var ListItem = React.createClass({
	render: function() {
		return (
			<div>
				<QuoteText quote={this.props.quote} />
				<ProfessorName professor={this.props.professor} />
			</div>
		);
	}
});

var QuoteText = React.createClass({
	render: function() {
		return (
			<p>"{this.props.quote}"</p>
		);
	}
});
var ProfessorName = React.createClass({
	render: function() {
		return (
			<p>--{this.props.professor}</p>
		);
	}
});

var source_url = 'http://www.zaphod.xyz/'+ api_key +'/search/quotes';

ReactDOM.render(
  <ListContainer source={source_url} />,
  document.getElementById('content')
);


