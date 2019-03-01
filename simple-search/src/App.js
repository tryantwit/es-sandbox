import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from './SearchResults.js';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`http://localhost:9200/movies/_search?q=title:${this.state.text}`)
      .then(
          (res) => {
            const items = res.data.hits.hits.map(item => (
              item._source
            ));
            this.setState({ items });
          });
  }

  render() {
    return (
      <div className="App">
        <h3>Search</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search-bar">
            Search the Movie database
          </label>
          <input
            id="search-bar"
            type="text"
            className="input"
            placeholder="Search..."
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Search
          </button>
        </form>
        <SearchResults items={this.state.items} />
      </div>
    );
  }
}

export default App;
