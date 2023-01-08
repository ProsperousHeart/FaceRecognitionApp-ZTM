import React, { Component } from 'react';
import './App.css';
import FunBG from './components/FunBG/FunBG';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

// function App() { // original - functional component

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    //console.log(event);
    console.log(event.target.value);
  }

  onBtnSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <FunBG id="tsparticles" />
        {/*<Particles options={particlesOptions}/>*/}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onBtnSubmit={this.onBtnSubmit}
        />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
