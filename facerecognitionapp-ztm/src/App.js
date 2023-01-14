import React, { Component } from 'react';
import './App.css';
import FunBG from './components/FunBG/FunBG';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imgURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

// function App() { // original - functional component
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

/* --- for testing ---
  componentDidMount() { //lifecycle component with React
    fetch('http://localhost:3000/')
      .then(resp => resp.json())
      .then(console.log) // same as (data => console.log(data))
  }
*/

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calcFaceLocs = (data) => {
    //const clarifaiFaces = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('intputIMG');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);

    let boxes = [];
    let temp = null;
    for(let idx = 0; idx < clarifaiFaces.length; idx++) {
      temp = clarifaiFaces[idx].region_info.bounding_box;
      //console.log("temp data:", temp)
      boxes.push({
        leftCol: temp.left_col * width,
        topRow: temp.top_row * height,
        rightCol: width - (temp.right_col * width),
        bottomRow: height - (temp.bottom_row * height)
      });
    }

    //console.log(boxes);
    return boxes;
  }

  dispFaceBox = (boxes) => {
    //console.log(boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    //console.log(event);
    // console.log(event.target.value);
    this.setState({ input: event.target.value },
      () => console.log("INPUT CHANGED:", this.state.input));
  }

  onImgSubmit = () => {
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
    //const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    //const IMAGE_URL = this.state.imgURL;
    const IMAGE_URL = this.state.input;

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
    //console.log(raw);

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

    // https://clarifai.com/clarifai/main/models/face-detection
    //fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        //.then(response => response.text()) // originally provided
        .then(response => response.json())
        //.then(result => console.log(result)) // originally provided
        .then(result => {
          if (result) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
              })
            })
              .then(res => res.json())
              .then(count => {
                /*this.setState({
                  user: {
                    entries: count
                  }
                })*/
                this.setState(Object.assign(this.state.user, { entries: count}));
              })
          }
          this.dispFaceBox(this.calcFaceLocs(result))
        })
        .catch(error => console.log('error', error));  // promise if something fails
  }

  onRouteChg = (route) => {
    if (route === 'signout') {
      //this.setState({isSignedIn: false});
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { imgURL, isSignedIn, route, boxes, user } = this.state;
    return (
      <div className="App">
        <FunBG id="tsparticles" />
        {/*<Particles options={particlesOptions}/>*/}
        <Navigation onRouteChg={this.onRouteChg} isSignedIn={isSignedIn} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank 
                name={user.name}
                entries={user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onImgSubmit={this.onImgSubmit}
              />
              <FaceRecognition
                boxes={boxes}
                imgURL={imgURL}
              />
            </div>
          : (
            route === 'register'
            ? <Register loadUser={this.loadUser} onRouteChg={this.onRouteChg} />
            : <SignIn loadUser={this.loadUser} onRouteChg={this.onRouteChg} />
          )
        }
      </div>
    );
  }
}

export default App;
