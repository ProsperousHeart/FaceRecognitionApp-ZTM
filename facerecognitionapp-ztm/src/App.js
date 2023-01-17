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

// require('dotenv').config();
// const SMARTBRAIN_BE = process.env.REACT_APP_BE;
const SMARTBRAIN_BE = process.env.REACT_APP_BE;
// console.log("start of script:", SMARTBRAIN_BE);
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
  },
  SMARTBRAIN_BE: SMARTBRAIN_BE
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
    // const clarifaiFaces = data.outputs[0].data.regions;
    const clarifaiFaces = data;
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
    
      // fetch('http://localhost:3000/imageURL', {
        fetch(SMARTBRAIN_BE + '/imageURL', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      //.then(result => console.log(result)) // originally provided
      .then(result => {
        // console.log("onIMGSubmit API call:", result);
        if (result) {
          this.dispFaceBox(result)
          // fetch('http://localhost:3000/image', {
          fetch(SMARTBRAIN_BE + '/image', {
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
            .catch(console.log)
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
    const { imgURL, isSignedIn, route, boxes, user, SMARTBRAIN_BE } = this.state;
    // console.log("render:", SMARTBRAIN_BE);
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
            ? <Register loadUser={this.loadUser} onRouteChg={this.onRouteChg} SMARTBRAIN_BE={SMARTBRAIN_BE} />
            : <SignIn loadUser={this.loadUser} onRouteChg={this.onRouteChg} SMARTBRAIN_BE={SMARTBRAIN_BE} />
          )
        }
      </div>
    );
  }
}

export default App;
