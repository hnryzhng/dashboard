import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
  	something: null,
    error: null
  }

  sendSomething = (event) => {
    event.preventDefault();

    const s = this.state.something;
    
    axios.post("/api/routeB", {
            sName: s
          })
          .then(response => response.data)
          .then(data => {
            if (data.success) {
              console.log("response data:", data);
            } else {      
              this.setState({ error: data.error })  // sets error message 
            }

          })
          .catch(err => console.log("error:", err));

  }
  render() {
    
    return (
      <div>
      	<p>Hello World</p>

        <form onSubmit={ this.sendSomething }>
          <input type="text" style={{ width: "300px" }} placeholder="Send Something!" name="sName" onChange={ event => this.setState({ something: event.target.value }) } />
          <button type="submit">SUBMIT ME TO YOUR TORTURE</button >
        </form>

      </div>
    );
  }

}

export default App;
