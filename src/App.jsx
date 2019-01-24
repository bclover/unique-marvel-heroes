/*
  THE CHALLENGE:
  get an array of all people in the Marvel organization, with no duplicate last names,
  sorted by id, and add a name field that is a combination of firstName + lastName
*/

import React, {Component} from 'react';
import './App.css';

class App extends Component {

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

  getAllHeroes() {
    const allHeroes = this.state.data.map((hero) => {
      return (
          <li key={hero.id}>{hero.firstName} {hero.lastName} ( {hero.organization} )</li>
      )
    });
    return allHeroes.sort((a, b) =>  a.key - b.key);
  }

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  getUniqueMarvelHeroes() {

    //just the Marvel heros
    const marvelHeroes = this.state.data.filter(hero => hero.organization === 'Marvel');

    //remove heroes with a duplicate last name
    let uniqueMarvelHeroes = this.removeDuplicatesBy(
        hero => hero.lastName, marvelHeroes
    );

    //sort the heroes by id
    uniqueMarvelHeroes = uniqueMarvelHeroes.sort((a, b) =>  a.id - b.id);

    //add a name property for each hero
    uniqueMarvelHeroes = uniqueMarvelHeroes.map(o => Object.assign({
      name: `${o.firstName} ${o.lastName}`,
    }, o));

    //log out the desired data to console
    console.log('Unique Marvel Heroes:', uniqueMarvelHeroes);

    //create the DOM elements
    const uniqueMarvelHeroesDOM = uniqueMarvelHeroes.map((hero) => {
      return (
          <li key={hero.id} className="marvel-li">
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
              Organization:  {hero.organization}
            </div>
          </li>
      )
    });

    return uniqueMarvelHeroesDOM;
  }

  render() {
    return (
      <div className="App">
        <h1>Hero Sorting Challenge!</h1>
        <section className="all-heroes-list">
          <h3>All Heroes (raw data)</h3>
          <ul className="heroes-list">
            {this.getAllHeroes()}
          </ul>
        </section>
        <section className="all-heroes-list">
          <h3> Marvel Heroes With a Unique Last Name Sorted by Id and a Name Field Added</h3>
          <ul className="heroes-list">
            {this.getUniqueMarvelHeroes()}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;


