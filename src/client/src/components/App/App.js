import React from 'react';
import './App.scss';
import Home from './../Home/Home';
import About from './../About/About';
import Profile from './../Profile/Profile';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {AuthAPI} from '../../api/AuthAPI';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      newReceipt: false,
      loggedIn: false
    }

    this.API_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API;
  }

  componentDidMount() { 
    AuthAPI.loggedIn().then(res => {
      this.setState({
        loggedIn: res,
        loaded: true
      });
    }).catch(err => {
      this.setState({
        authError: true
      })
    })
  }

  render() {
      const nav = <nav>
      <Link to="/"><button type="button" className="navButton">Home</button></Link>
      <Link to="/about"><button type="button" className="navButton">About</button></Link>
      {!this.state.loggedIn ? <a href={`${this.API_URL}/auth/google`}><button type="button" className="navButton">Login with Google</button></a> : 
      <>
        <Link to="/profile"><button type="button" className="navButton">Profile</button></Link>
        <a href={`${this.API_URL}/auth/logout`}><button type="button" className="navButton">Logout</button></a>      
      </>
      }
    </nav>;
    
    if(this.state.authError) {
      return (
        <h2>Failed to communicate with the backend :(</h2>
      );
    } else if (this.state.loaded) {
      return (
        <Router>
          <div className="App">
            <h1>Receipt Keeper <span role='img' aria-label='Receipt'>🧾</span> </h1>
            {nav}
          </div>
          <Switch>
            <Route exact path="/">
                <Home loggedIn={this.state.loggedIn} loaded={this.state.loaded}></Home>
            </Route>
            <Route exact path="/about">
              <About></About>
            </Route>
            <Route exact path="/profile">
              <Profile></Profile>
            </Route>
            <Route>
              <div className="container">
                <div className="info">
                  <h2>Page not found :/</h2>
                </div>
              </div>
            </Route> 
          </Switch>
        </Router>
      );
    } else return (<></>);
  }
}