import React, {Component} from 'react';
import Filters from '../Filters/Filters';
import Result from '../Result/Result';
import Loading from '../Loading/Loading';
import axios from 'axios';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets            : [],
			currency           : [
				{
					name  : 'RUB',
					rate  : 1,
					symbol: '\u20BD'
				},
				{
					name  : 'USD',
					rate  : 30,
					symbol: '\u0024'

				},
				{
					name  : 'EUR',
					rate  : 40,
					symbol: '\u20AC'
				}
			],
			activeCurrencyIndex: 0,
			stopsQuantity      : ['all']
		};

		this.changeCurrency = this.changeCurrency.bind(this);
		this.changeStops    = this.changeStops.bind(this);

	}

	render() {

		console.log(this.state);
		const results = this.getResults();

		let stops = [];
		this.state.tickets.forEach((ticket) => {
			if (!stops.includes(ticket.stops)) {
				stops.push(ticket.stops);
			}
		});
		stops.sort((a, b) => a - b);

		return (
			<div className='container'>
				<Filters stops={stops}
						 chosenStops={this.state.stopsQuantity}
						 changeStops={this.changeStops}
						 currency={this.state.currency}
						 changeCurrency={this.changeCurrency}
						 activeCurrencyIndex={this.state.activeCurrencyIndex}/>
				<div className='search-results'>
					{this.state.stopsQuantity.length
					 ? (results.length)
					   ? results
					   : <Loading/>
					: <h3>Пожалуйста выберите хотя бы один фильтр</h3>}
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios.get('/api/tickets')
			 .then((res) => this.setState({tickets: res.data.tickets}))
			 .catch((err) => console.error(err));

		this.getCurrencyRate();
	}

	getResults() {
		let tickets = this.filterResultsByStops();

		return tickets.map((ticket, i) => {
			let {activeCurrencyIndex, currency} = this.state;

			const rate = currency[activeCurrencyIndex].rate;

			currency = currency[activeCurrencyIndex].symbol;

			return <Result key={i}
						   carrier={ticket.carrier}
						   price={ticket.price * rate}
						   departure_time={ticket.departure_time}
						   origin={ticket.origin}
						   origin_name={ticket.origin_name}
						   departure_date={ticket.departure_date}
						   arrival_date={ticket.arrival_date}
						   arrival_time={ticket.arrival_time}
						   destination={ticket.destination}
						   destination_name={ticket.destination_name}
						   stops={ticket.stops}
						   currency={currency}/>
		});
	}

	getCurrencyRate() {
		let {currency} = this.state;

		axios.get('https://api.exchangeratesapi.io/latest?base=RUB')
			 .then((res) => {
				 currency = currency.map((cur) => ({
					 name  : cur.name,
					 rate  : res.data.rates[cur.name],
					 symbol: cur.symbol
				 }));

				 this.setState({currency})
			 })
			 .catch((err) => console.error(err));

	}

	changeCurrency(num) {
		this.setState({activeCurrencyIndex: num});
	}

	filterResultsByStops() {
		const {tickets, stopsQuantity} = this.state;

		if (stopsQuantity.includes('all')) {
			return tickets;
		}

		return tickets.filter((ticket) => stopsQuantity.includes(ticket.stops));
	}

	changeStops(val) {
		let {stopsQuantity} = this.state;

		const {stop, only} = val;
		console.log(stop);

		if (only) {
			stopsQuantity = [stop];
			this.setState({stopsQuantity});
		}
		else if (stopsQuantity.includes(stop)) {
			stopsQuantity = stopsQuantity.filter((e) => e !== 'all');
			let index     = stopsQuantity.indexOf(stop);
			stopsQuantity.splice(index, 1);
			this.setState({stopsQuantity});

		} else {
			stopsQuantity = stopsQuantity.filter((e) => e !== 'all');
			stopsQuantity.push(stop);
			this.setState({stopsQuantity});
		}
	}
}

export default Container;