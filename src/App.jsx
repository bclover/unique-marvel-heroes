import React, {Component} from 'react';
import './App.css';

class App extends Component {

  /*
    THE CHALLENGE:
    -get an array of all people in the Marvel organization
    -with no duplicate last names
    -sorted by id,
    -and add a name field that is a combination of firstName + lastName
  */

  state = {
    data: [
        {
          id: 3,
          firstName: 'Tony',
          lastName: 'Stark',
          organization: 'Marvel'
        },
        {
          id: 1,
          firstName: 'Bruce',
          lastName: 'Banner',
          organization: 'Marvel'
        },
        {
          id: 2,
          firstName: 'Bruce',
          lastName: 'Wayne',
          organization: 'DC'
        },
        {
          id: 5,
          firstName: 'Clark',
          lastName: 'Kent',
          organization: 'DC'
        },
        {
          id: 4,
          firstName: 'John',
          lastName: 'Stark',
          organization: 'Marvel'
        }
    ]
  };

  createAllHeroes() {
    const allHeroes = this.state.data.map((hero) => {
      return (
          <li key={hero.id}>
            {hero.id} - {hero.firstName} {hero.lastName} ({hero.organization})
          </li>
      )
    });
    return allHeroes;
  }

  createMarvelHeroes(){

    //Filter out heroes that belong to Marvel only
    let marvelHeroes = this.state.data.filter(hero => hero.organization === 'Marvel');

    //Sort the Marvel heroes by id
    marvelHeroes.sort((a, b) =>  a.id - b.id);

    //Remove heroes that have duplicate last names (keep only the first one)
    marvelHeroes = this.removeDuplicatesBy(hero => hero.lastName, marvelHeroes);

    //Add a new 'name' field to each Marvel hero
    marvelHeroes = marvelHeroes.map(o => Object.assign({
      name: `${o.firstName} ${o.lastName}`,
    }, o));

    //Log out the desired results to the console
    console.log('Unique Marvel Heroes:', marvelHeroes);

    //create and return the DOM elements to the render method
    return this.createMarvelHeroesDOM(marvelHeroes);

  }

  createMarvelHeroesDOM(heroes) {
    return heroes.map((hero) => {
      return (
          <li key={hero.id} className="marvel-li">
            <div>
              Hero ID: {hero.id}
            </div>
            <div>
              First: {hero.firstName}
            </div>
            <div>
              Last: {hero.lastName}
            </div>
            <div>
              Name: {hero.name}
            </div>
            <div>
              Organization: {hero.organization}
            </div>
          </li>
      );
    });
  }

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  // RENDER METHOD //
  render() {
    return (
      <div className="App">
        <section className="all-heroes-list">
          <h1 className="header">The SemanticBits Hero Sorting Challenge!</h1>
          <h3>All Heroes (raw data)</h3>
          <ul className="heroes-list">
            {this.createAllHeroes()}
          </ul>
        </section>
        <section className="sorted-heroes-list">
          <h3>Sorted Heroes:</h3>
          <ul className="heroes-list">
            {this.createMarvelHeroes()}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;


