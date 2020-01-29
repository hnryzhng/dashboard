import React, { Component } from 'react';

import '../styles.css';

class Logo extends Component {
	render() {
		return(
			<div>
				<img id="logo-img" src={ require('../assets/logo1.png')} alt="" />
			</div>
		)		
	}
}

export default Logo;