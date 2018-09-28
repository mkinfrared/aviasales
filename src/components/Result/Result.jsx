import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {getStopsMood} from '../../utilities/utilities';

moment.updateLocale('ru', {
	weekdaysMin: moment.weekdaysShort().map((weekDay) => {
		return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
	})
});

function Result(props) {
	const carriers = {
		TK: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Turkish_Airlines_logo.svg',
		S7: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/S7_new_logo.svg',
		SU: 'https://upload.wikimedia.org/wikipedia/ru/a/a1/Aeroflot_logo.svg',
		BA: 'https://upload.wikimedia.org/wikipedia/ru/4/42/British_Airways_Logo.svg'
	};

	const {
			  carrier, price, departure_time,
			  origin, origin_name, departure_date,
			  arrival_date, arrival_time, destination,
			  destination_name, stops, currency
		  } = props;

	const departureDate = moment(departure_date, 'DD.MM.YYYY');
	const arrivalDate   = moment(arrival_date, 'DD.MM.YYYY');

	const stop = getStopsMood(stops) === 'Без пересадок' ? '' : getStopsMood(stops);

	return (
		<div className='result'>
			<div className="purchase-block">
				<div className="carrier-logo">
					<img src={carriers[carrier]} alt={carrier}/>
				</div>
				<button>
					Купить<br/>за {(currency === '\u20BD')
								   ? `${price.toLocaleString('ru-RU')} ${currency}`
								   : `${currency}${Math.round(price).toLocaleString('ru-RU')}`}
				</button>
			</div>
			<div className="ticket-details">
				<div className="departure">
					<h3>{departure_time}</h3>
					<h4>{origin}, {origin_name}</h4>
					<h5>
						{departureDate.format('D MMM YYYY, dd')}
					</h5>
				</div>
				<div className="arrival">
					<h3>{arrival_time}</h3>
					<h4>{destination}, {destination_name}</h4>
					<h5>
						{arrivalDate.format('D MMM YYYY, dd')}
					</h5>
				</div>
				<div className="arrow">
					<p>{stop}</p>
				</div>
			</div>
		</div>
	);
}

export default Result;