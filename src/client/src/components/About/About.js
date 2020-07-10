import React from 'react';
import "../../styles/main.scss";

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="info">
                    <h2>About</h2>
                    <p>Simple web application keeps your receipts!</p>
                    <p>Made by Michael W - <a href="https://github.com/WMichael/ReceiptKeeper" target="blank">Github Repo</a></p>
                </div>
            </div>
        )
    }
}

export default About;