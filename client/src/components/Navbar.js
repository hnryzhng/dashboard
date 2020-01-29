import React, { Component } from 'react';

import Logo from './Logo.js';

import '../styles.css';

class Navbar extends Component {
	render() {
		return(
			<nav id="navbar" className="navbar navbar-expand-md shadow-sm bg-white rounded">

				<Logo />

			</nav>
		)
	}
}

export default Navbar;