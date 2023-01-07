import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';

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
