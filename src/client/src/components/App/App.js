import React from 'react';
import Receipt from '../Receipt/Receipt'
import './App.scss';
import NewReceipt from './../NewReceipt/NewReceipt';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      newReceipt: false,
      receipts: []
    }

    this.fetchReceipts = this.fetchReceipts.bind(this);
    this.newReceiptToggle = this.newReceiptToggle.bind(this);
  }

  fetchReceipts() {
    fetch(`${process.env.REACT_APP_API}/receipts`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            receipts : result.sort((a,b) => {
              return new Date(b.purchase_date) - new Date(a.purchase_date)
            })
          });
        }
      );
  }

  newReceiptToggle() {
    this.setState({
      newReceipt : !this.state.newReceipt
    });
  }

  componentDidMount() { 
    this.fetchReceipts();
  }

  render() {

    const receipts = this.state.receipts.map(item =>
      <Receipt key={item._id} receipt={item} fetchReceipts={this.fetchReceipts}></Receipt>
    );

    return (
      <div className="App">
        <h1>Receipt Keeper <span role='img' aria-label='Receipt'>🧾</span> </h1>
        <nav>
          <button type="button" className="navButton" onClick={this.newReceiptToggle}>New Receipt</button>
          <button type="button" className="navButton">About</button>
        </nav>
        {this.state.newReceipt ? <NewReceipt newReceiptToggle={this.newReceiptToggle} fetchReceipts={this.fetchReceipts}></NewReceipt> : null}
        {receipts}
      </div>
    );
  }
}

export default App;
