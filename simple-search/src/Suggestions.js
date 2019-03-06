import React, { Component } from 'react';

class Suggestions extends Component {
  render() {
    const suggestions = this.props.items
    if (suggestions.length < 1) {
      return null;
    } else {
      return (
        <div>
          <p>Did you mean: {suggestions.join(' ')}</p>
        </div>
      )
    }
  }
}

export default Suggestions;
