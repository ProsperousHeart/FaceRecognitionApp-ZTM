import React, { Component } from 'react';
import './App.css';
import FunBG from './components/FunBG/FunBG';
//import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

//const app = new Clarifai.App({
//  apiKey: '54c74347450044b2be92c6550f227a70'
//});

// function App() { // original - functional component
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgURL: ''
    }
  }

  onInputChange = (event) => {
    //console.log(event);
    // console.log(event.target.value);
    this.setState({ input: event.target.value },
      () => console.log("INPUT CHANGED:", this.state.input));
  }

  onBtnSubmit = () => {
    this.setState({ imgURL: this.state.input }, 
      () => console.log("SETTING URL:", this.state.imgURL));
    
    //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////

    const USER_ID = 'prosperousheart';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '7773bac5e6d24f0cac58ad719eba396f';
    const APP_ID = 'face-recog-app';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    const IMAGE_URL = this.state.imgURL;

    const raw = JSON.stringify({
      "user_app_id": {
        //"user_id": "clarifai",
        "user_id": USER_ID,
        //"app_id": "main"
        "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    console.log(raw);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT // https://docs.clarifai.com/clarifai-basics/authentication/personal-access-tokens/
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    //fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    //fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    //fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));  
  }

  render() {
    //const { imgURL } = this.state;
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
        {/*<FaceRecognition imgURL={imgURL} />*/}
        <FaceRecognition imgURL={this.state.imgURL} />
      </div>
    );
  }
}

export default App;
