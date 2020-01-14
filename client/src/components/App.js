import React, { Component } from 'react';

// import styles
import '../styles.css'



// import components
import Tile from './Tile.js';
import LineChartContainer from './LineChartContainer.js';

class App extends Component {

  // top-level configurations: tile layout/arrangement

  state = {
  }


  render() {
    
    return (
      <div>

        <Tile />

      </div>
    );
  }

}

export default App;
