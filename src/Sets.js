import React, { Component } from 'react';
import './Sets.css';
import http from 'axios';

class Sets extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sets: []
    };
  };

  componentWillMount() {
    this.fetchSets();
  };

  // Sorts the sets based on their name, in alphabetical ascending order
  sortSets = (sets) => {
    return sets
      .sort(function(a, b) {
        // Sort implementation based on MDN Docs for .sort():
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
  };

  // GET /sets
  // Updates state[:sets] if successful with all sets (sorted alphabetically)
  fetchSets = () => {
    // We only want expansion sets, those designed for drafting, e.g. Innistrad
    const setsApi = 'https://api.magicthegathering.io/v1/sets?type=expansion'
    return http.get(setsApi)
      .then(response => {
        console.log(response);
        this.setState({
          sets: this.sortSets(response.data.sets)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  logSelection = (selectedSet) => {
    const set = selectedSet.target;
    const setName = set.innerText;
    console.log(`User has selected: ${setName}`);
    window.alert(`User has selected: ${setName}`);
  };

  renderSets = () => {
    return this.state.sets.map(set => {
      return (
        <li
          key={set.code}
          onClick={this.logSelection}
        >
          {set.name}
        </li>
      );
    });
  };

  render() {
    return (
      <div id="Sets-Container">
        <ul id="Sets">
          {
            this.renderSets()
          }
        </ul>
      </div>
    );
  };
}

export default Sets;
