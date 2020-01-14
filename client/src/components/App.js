import React, { Component } from 'react';

// import styles
import '../styles.css'

// import components
import LineChartContainer from './LineChartContainer.js';

class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
  }


  render() {
    
    return (
      <div>
      	<p> APP!! </p>

        <LineChartContainer />

      </div>
    );
  }

}

export default App;
