import React, {Component} from 'react';
import {getStopsMood} from '../../utilities/utilities';

class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {chosenStops} = this.props;

		const currencies = this.printCurrency();
		const stops      = this.getStops();

		return (
			<div className='filters-wrap'>
				<p>Валюта</p>
				<div className="currency">
					{currencies}
				</div>
				<div className='filter'>
					<p>Количество пересадок</p>
					<div className='stops-filter'>
						<label className='checkbox'>Все
							<input type="checkbox"
								   checked={chosenStops.includes('all')}
								   onChange={() => this.props.changeStops({stop: 'all', only: true})}/>
							<span className='checkmark'></span>
						</label>
					</div>
					{stops}
				</div>
			</div>
		);
	}

	printCurrency() {
		const {currency, activeCurrencyIndex} = this.props;

		return currency.map((curr, i) => (
			<button key={i}
					className={activeCurrencyIndex === i ? 'active' : null}
					onClick={() => this.props.changeCurrency(i)}>
				{curr.name}
			</button>
		));
	}

	getStops() {
		const {stops, chosenStops} = this.props;

		return stops.map((stop, i) => (
			<div key={i}
				 className='stops-filter'>
				<label className='checkbox'>{getStopsMood(stop)}
					<input type="checkbox"
						   checked={chosenStops.includes(stop)}
						   onChange={() => this.props.changeStops({stop, only: false})}/>
					<span className='checkmark'></span>
				</label>
				<div className='checkbox__only'
					 onClick={() => this.props.changeStops({stop, only: true})}>
					Только
				</div>
			</div>
		));
	}
}

export default Filters;