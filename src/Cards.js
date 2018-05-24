import React, { Component } from 'react';
import './Cards.css';
import http from 'axios';

class Cards extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  };

  componentWillMount() {
    this.fetchCards();
  };

  // Sorts the cards based on their name, in alphabetical ascending order
  sortCards = (cards) => {
    return cards
      .sort(function(a, b) {
        // Sort implementation based on MDN Docs for .sort():
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
        //  Global_Objects/Array/sort#Description
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

  // GET /cards
  // Updates state[:cards] if successful, with all cards (sorted alphabetically)
  fetchCards = () => {
    // We only want expansion cards, those designed for drafting, e.g. Innistrad
    const set = this.props.setAcronym;
    const cardsApi = `https://api.magicthegathering.io/v1/cards?set=${set}`

    return http.get(cardsApi)
      .then(response => {
        console.log(response);
        this.setState({
          cards: this.sortCards(response.data.cards)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderCards = () => {
    return this.state.cards.map(card => {
      return (
        <li
          key={card.id}
        >
          <span
            className="Card-Name"
          >
            {card.name}
          </span>

          <img
            alt={card.name}
            className="Card-Image"
            src={card.imageUrl}
          />
        </li>
      );
    });
  };

  render() {
    return (
      <div id="Cards-Container">
        <ul id="Cards">
          {
            this.renderCards()
          }
        </ul>
      </div>
    );
  };
}

export default Cards;
