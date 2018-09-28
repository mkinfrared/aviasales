export function getStopsMood(number) {

	if (number === 0) {
		return 'Без пересадок';
	}

	if (number % 10===1 && number !== 11) {
		return `${number} пересадка`;
	}

	if (number % 10 > 1 && number % 10 < 5) {
		return `${number} пересадки`;
	}

	if (number % 10 > 4) {
		return `${number} пересадок`;
	}

}