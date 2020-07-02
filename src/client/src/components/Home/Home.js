import React from 'react';
import { ReceiptApi } from './../../api/ReceiptAPI';
import Receipt from '../Receipt/Receipt'
import NewReceipt from './../NewReceipt/NewReceipt';
import '../../styles/main.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            newReceipt: false,
            receipts: []
        }
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
        this.fetchReceipts();
    }
    

    render() {
        const receipts = this.state.receipts.map(item =>
            <Receipt key={item._id} receipt={item} fetchReceipts={this.fetchReceipts}></Receipt>
            );

        const initialInfo = (
            <div className="container">
                <div className="info">
                    <h2>Welcome</h2>
                    <p>Please login to add & view your receipts!</p>
                </div>
            </div>
        );

        return(
            <>
            {this.props.loggedIn ? <div className="subActions"><button type="button" className="navButton" onClick={this.newReceiptToggle}>New Receipt</button></div> 
            : this.props.loaded ? initialInfo : ''}
            {this.state.newReceipt ? <NewReceipt newReceiptToggle={this.newReceiptToggle} fetchReceipts={this.fetchReceipts}></NewReceipt> : ''}
            {receipts}
            </>
        );
    }
}

export default Home;