import React, { Component } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import Suggestions from './Suggestions';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', items: [], suggestions: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:9200/movies/_search', {
      "query": {
        "match": {
          "title": this.state.text
        }
      },
      "suggest": {
        "suggestions": {
          "text": this.state.text,
          "term": {
            "field": "title"
          }
        }
      }
    })
    .then(
        (res) => {
          const items = res.data.hits.hits.map(item => (
            item._source
          ));
          if (items.length < 1) {
            const suggestions = res.data.suggest.suggestions.map(item => (
              item.options[0].text
            ));
            this.setState({ suggestions });
            this.setState({ items: [] });
          } else {
            this.setState({ suggestions: [] });
            this.setState({ items });
          }
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
        <Suggestions items={this.state.suggestions} />
        <SearchResults items={this.state.items} />
      </div>
    );
  }
}

export default App;
