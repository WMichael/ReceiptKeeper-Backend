import React from 'react';
import Receipt from '../Receipt/Receipt'
import './App.scss';
import NewReceipt from './../NewReceipt/NewReceipt';
import About from './../About/About';
import Profile from './../Profile/Profile';
import { ReceiptApi } from './../../api/ReceiptAPI';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {AuthAPI} from '../../api/AuthAPI';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      newReceipt: false,
      loggedIn: false,
      receipts: []
    }

    this.API_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API;
    this.fetchReceipts = this.fetchReceipts.bind(this);
    this.newReceiptToggle = this.newReceiptToggle.bind(this);
  }

  fetchReceipts() {
    ReceiptApi.all().then(result => {
      this.setState({
        receipts : result.sort((a,b) => {
          return new Date(b.purchase_date) - new Date(a.purchase_date)
        })
      });  
    });
  }

  newReceiptToggle() {
    this.setState({
      newReceipt : !this.state.newReceipt
    });
  }

  componentDidMount() { 
    AuthAPI.loggedIn().then(res => {
      this.setState({
        loggedIn: res,
        loaded: true
      });
      this.fetchReceipts();
    })
  }

  render() {
    const receipts = this.state.receipts.map(item =>
      <Receipt key={item._id} receipt={item} fetchReceipts={this.fetchReceipts}></Receipt>
      );

    let nav = "";
    if(this.state.loaded) { 
        nav = <nav>
      <Link to="/"><button type="button" className="navButton">Home</button></Link>
      <Link to="/about"><button type="button" className="navButton">About</button></Link>
      {!this.state.loggedIn ? <Link to="/login"><button type="button" className="navButton">Login</button></Link> : 
      <>
        <button type="button" className="navButton" onClick={this.newReceiptToggle}>New Receipt</button>
        <Link to="/profile"><button type="button" className="navButton">Profile</button></Link>
        <a href={`${this.API_URL}/auth/logout`}><button type="button" className="navButton">Logout</button></a>      
      </>
      }
    </nav>;
    }

    // TODO: seperate contents of each route into a seperate component
    return (
      <Router>
        <div className="App">
          <h1>Receipt Keeper <span role='img' aria-label='Receipt'>🧾</span> </h1>
          {nav}
        </div>

        <Switch>
          <Route exact path="/">
              {this.state.newReceipt ? <NewReceipt newReceiptToggle={this.newReceiptToggle} fetchReceipts={this.fetchReceipts}></NewReceipt> : null}
              {receipts}
          </Route>
          <Route exact path="/about">
            <About></About>
          </Route>
          <Route exact path="/profile">
            <Profile></Profile>
          </Route>
          <Route exact path="/login">
            <div className="login">
              <h2>User not logged in!</h2>
              <a href={`${this.API_URL}/auth/google`}><button type="button" className="navButton">Login with Google</button></a>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
