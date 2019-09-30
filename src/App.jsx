import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import AppLayout from 'layouts/app-layout';

import { Icons as VizzIcons } from 'vizzuality-components';

import 'he-components/dist/main.css';
import 'vizzuality-components/dist/legend.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{width:'100vw', height:'100vh', backgroundColor: '#0a212e'}} >
        <AppLayout />
        <VizzIcons />
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;