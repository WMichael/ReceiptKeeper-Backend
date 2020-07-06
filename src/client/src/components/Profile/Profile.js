import React from 'react';
import "../../styles/main.scss";
import "./Profile.scss";
import {UserApi} from '../../api/UserAPI';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        UserApi.info().then((res)=> {
            this.setState({
                username: res.username,
                createdAt: res.createdAt,
                receipts: res.receipts,
                loaded: true
            });
        }).catch((err) => {
            throw err;
        });
    }

    render() {
        return(
            <div className="container">
                {this.state.loaded ?
                    <div className="profile">
                        <div id="profileHeader" className="profileHeader"><h2>Profile</h2></div>
                        <div id="usernameLbl" className="property">Username</div>
                        <div id="usernameValue" className="value">{this.state.username}</div>
                        <div id="createdOnLbl" className="property">Created on</div>
                        <div id="createdOnValue" className="value">{new Date(this.state.createdAt).toLocaleDateString("en-GB")}</div>
                        <div id="numOfReceiptsLbl" className="property">Number of receipts</div>
                        <div id="numOfReceiptsValue" className="value">{this.state.receipts}</div>
                    </div>
                    : '' 
                }
            </div>
        );
    }
}

export default Profile;