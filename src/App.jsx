import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import Globe from 'components/globe';
import Sidebar from 'components/sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Globe />
        <Sidebar>
          <div>COnnnannan</div>
          <div>COnnnannan</div>
          <div>COnnnannan</div>
          <div>COnnnannan</div>
        </Sidebar>
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
