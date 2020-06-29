import React from 'react';
import '../../styles/receipt.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ReceiptApi } from './../../api/ReceiptAPI';

class Receipt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            receipt_id: props.receipt._id,
            name: props.receipt.name,
            description: props.receipt.description,
            image_url: props.receipt.image_url,
            price: props.receipt.price,
            purchase_date: new Date(props.receipt.purchase_date),
            editMode: false
        };

        this.switchMode = this.switchMode.bind(this);
        this.saveReceipt = this.saveReceipt.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.deleteReceipt = this.deleteReceipt.bind(this);
    }

    switchMode() {
        this.setState({editMode: !this.state.editMode});
    }

    deleteReceipt() {
        if(window.confirm(`Are you sure you want to permanently delete ${this.state.name}?`)) {
           ReceiptApi.delete(this.state.receipt_id).then(res => {
                console.log("Successfully deleted!");
                this.props.fetchReceipts();
            }).catch(err => {
                console.log("Error with deleting receipt");
            });
        };
    }

    saveReceipt() {
        this.switchMode();
        ReceiptApi.update(this.state.receipt_id, {
            name : this.state.name,
            description : this.state.description,
            image_url : this.state.image_url,
            price: this.state.price,
            purchase_date: this.state.purchase_date
        }).then(res => {
            console.log("Successfully updated!");
            this.props.fetchReceipts();
        }).catch(err => { 
            console.log("Error with updating receipt");
        });
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

    render() {
        return(
            <div className="receiptContainer">
                <h1>{this.state.name}</h1>
                <div className="actions">
                    <span id="save" hidden={!this.state.editMode} role="img" aria-label="save" onClick={this.saveReceipt}><FontAwesomeIcon className="icon" icon={faCheck}/></span>
                    <span hidden={this.state.editMode} role="img" aria-label="edit" onClick={this.switchMode}><FontAwesomeIcon className="icon" icon={faEdit}/></span>
                    <span ><a  href={this.state.image_url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon className="icon" icon={faImage}/></a></span>
                    <span id="delete" role="img" aria-label="delete" onClick={this.deleteReceipt}><FontAwesomeIcon className="icon" icon={faTrash}/></span>
                </div>
                <div hidden={this.state.editMode} className="receiptDetails"> 
                    <ul>
                        <li><b>Name:</b> {this.state.name}</li>
                        <li><b>Description:</b> {this.state.description}</li>
                        <li><b>Price:</b> £{this.state.price}</li>
                        <li><b>Purchase Date:</b> {this.state.purchase_date.toLocaleDateString("en-GB")}</li>
                    </ul>
                </div>
                <div hidden={!this.state.editMode} className="receiptDetails">
                    <form>
                        <label><b>Name:</b> </label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /> <br/>
                        <label><b>Description:</b> </label>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /><br/>
                        <label><b>Price:</b> </label>
                        <input type="text" name="price" value={this.state.price} onChange={this.handleChange} /> <br/>
                        <label><b>Image Url:</b> </label>
                        <input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} /> <br/>
                        <label><b>Purchase Date:</b> </label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={this.state.purchase_date} onChange={this.handleDateChange}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Receipt;