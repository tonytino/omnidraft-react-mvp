import React, { Component } from 'react';
import './App.css';
import Cards from './Cards.js';
import Sets from './Sets.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displaying: 'sets',
      setAcronym: ''
    };
  }

  reportSelection = (setAcronym) => {
    this.setState({
      displaying: 'cards',
      setAcronym: setAcronym
    });
  };

  renderCards = () => {
    if (this.state.displaying === 'cards') {
      return (
        <Cards
          setAcronym={this.state.setAcronym}
        >
        </Cards>
      );
    };
  };

  renderSets = () => {
    if (this.state.displaying === 'sets') {
      return (
        <Sets
          reportSelection={this.reportSelection}
        >
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
          { this.renderCards() }
          { this.renderSets() }
        </div>
      </div>
    );
  }
}

export default App;
