import React, { Component } from 'react';

class SearchResults extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
    )
  }
}

export default SearchResults;
