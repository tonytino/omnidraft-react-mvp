import React, { Component } from 'react';
import './App.css';
import Sets from './Sets.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displaying: 'sets'
    };
  }

  renderSets = () => {
    if (this.state.displaying === 'sets') {
      return (
        <Sets>
        </Sets>
      );
    };
  };

  render() {
    return (
      <div id="App">
        <header id="App-Header">
          <h1 id="App-Title">
            Omnidraft
          </h1>
        </header>

        <div id="App-Body">
          { this.renderSets() }
        </div>
      </div>
    );
  }
}

export default App;
