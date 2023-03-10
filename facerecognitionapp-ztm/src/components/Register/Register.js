import React from 'react';
//import './Register.css';

//const Register = ({ onRouteChg }) => {
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            SMARTBRAIN_BE: this.props.SMARTBRAIN_BE
        }
    }

    onNameChg = (event) => {
        this.setState({name: event.target.value});
    }

    onEmailChg = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChg = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        // console.log(this.state);
        const { name, email, password, SMARTBRAIN_BE } = this.state;
        // if (!name || !email || !password) {}
        fetch(SMARTBRAIN_BE + '/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(resp => resp.json())
            //.then(console.log);
            .then(user => {
                if (user.id) {
                    //console.log("winning?");
                    this.props.loadUser(user);
                    this.props.onRouteChg('home');
                } /*else {
                    console.log(data);
                }*/
            });
        //this.props.onRouteChg('home');}
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form-panels">
                <main className="pa4 black-80">
                    {/*<form className="measure">*/}
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.onNameChg}
                            />
                        </div>
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
                                onClick={this.onSubmitRegister} // defining the function called
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;
