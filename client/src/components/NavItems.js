import React, { Component } from 'react';

import '../styles.css';

class NavItems extends Component {
	render() {
		return(
			<div className="collapse navbar-collapse">
				<div className="navbar-nav">
				  <a className="nav-item nav-link" href="http://henryzheng.me/">My Work</a>
				  <a className="nav-item nav-link" href="mailto:hnryzhng@gmail.com">Contact Me</a>
				</div>
			</div>
		);
	}
}

export default NavItems;