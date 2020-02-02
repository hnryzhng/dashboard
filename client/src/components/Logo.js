import React, { Component } from 'react';

import '../styles.css';

class Logo extends Component {
	render() {
		return(
			<div id="logo-container">
				<img className="d-flex" id="logo-img" src={ require('../assets/logo2.png')} alt="" />
			</div>
		)		
	}
}

export default Logo;