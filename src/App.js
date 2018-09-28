import React, {Component} from 'react';
import PlaneIcon from './components/PlaneIcon/PlaneIcon';
import Container from './components/Container/Container';

class App extends Component {
	render() {
		return (
			<div className="App">
				<PlaneIcon/>
				<Container/>
			</div>
		);
	}
}

export default App;
