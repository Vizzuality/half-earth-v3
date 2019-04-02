import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import Globe from 'components/globe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Globe />
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
