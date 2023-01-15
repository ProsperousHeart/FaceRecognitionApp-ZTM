import React from 'react';
//import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChg = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChg = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        // console.log(this.state);
        const { signInEmail, signInPassword } = this.state;
        // if (!signInEmail || !signInPassword) {
        //     console.log('Please provide login credentials');
        // } else {
            fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword
                })
            })
                .then(resp => resp.json())
                //.then(console.log);
                .then(user => {
                    //if (user === 'success') {
                    if (user.id) {
                        //console.log("winning?");
                        this.props.loadUser(user);
                        this.props.onRouteChg('home');
                    } else {
                        console.log(user);
                    }
                })
                .catch(err => console.log);
            //this.props.onRouteChg('home');
        // }
    }

    render() {
        const { onRouteChg } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form-panels">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChg}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChg}
                            />
                        </div>
                        {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>*/}
                        </fieldset>
                        <div className="">
                            <input
                                //onClick={() => onRouteChg('home')} // defining the function called
                                onClick={this.onSubmitSignIn} // defining the function called
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChg('register')} className="f6 link dim black db pointer">Register</p>
                            {/*<a href="#0" className="f6 link dim black db">Forgot your password?</a>*/}
                        </div>
                    </div>
                </main>
            </article>
        );

    }
}

export default SignIn;
