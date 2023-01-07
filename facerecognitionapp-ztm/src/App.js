import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';

// function App() { // original - functional component
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {/*<Logo />
        <ImageLinkForm />*/}
      </div>
    );
  }
}

export default App;
