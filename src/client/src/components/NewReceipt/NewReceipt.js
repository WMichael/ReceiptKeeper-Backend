import React from 'react';
import "../../styles/receipt.scss";
import "../../styles/main.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ReceiptApi } from './../../api/ReceiptAPI';

class NewReceipt extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Untitled Receipt",
            description: "",
            price: 0,
            image_url: "",
            purchase_date: new Date()
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveReceipt = this.saveReceipt.bind(this);
    }

    saveReceipt() {
        ReceiptApi.save({
            name : this.state.name,
            description : this.state.description,
            image_url : this.state.image_url,
            price: this.state.price,
            purchase_date: this.state.purchase_date
        }).then(res => {
            console.log("Successfully saved!");
            this.props.fetchReceipts();
            this.props.newReceiptToggle();
        }).catch(err => {
            console.log(err);
            console.log("Failed to save receipt");
        })
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            purchase_date : date
        });
    }

    render(){
        return(
            <div className="container">
                <h1>{this.state.name}</h1>
                <div className="actions">
                    <span id="save" role="img" aria-label="save" onClick={this.saveReceipt}><FontAwesomeIcon className="icon" icon={faCheck}/></span>
                </div>
                <div className="receiptDetails">
                    <form>
                        <label id="nameLbl"><b>Name:</b> </label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /> <br/>
                        <label id="descriptionLbl"><b>Description:</b> </label>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
                        <label id="priceLbl"><b>Price:</b> </label>
                        <input type="text" name="price" value={this.state.price} onChange={this.handleChange} /> <br/>
                        <label id="imageUrlLbl"><b>Image Url:</b> </label>
                        <input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} /> <br/>
                        <label id="purchaseDateLbl"><b>Purchase Date:</b> </label>
                        <DatePicker dateFormat="dd/MM/yyyy" name="purchaseDate" selected={this.state.purchase_date} onChange={this.handleDateChange}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewReceipt;