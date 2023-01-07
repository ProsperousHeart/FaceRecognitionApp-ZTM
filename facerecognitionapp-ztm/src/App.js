import React, { Component } from 'react';
import './App.css';
import FunBG from './components/FunBG/FunBG';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

// function App() { // original - functional component

class App extends Component {

  render() {
    return (
      <div className="App">
        <FunBG id="tsparticles" />
        {/*<Particles options={particlesOptions}/>*/}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
