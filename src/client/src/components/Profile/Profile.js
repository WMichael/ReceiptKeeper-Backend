import React from 'react';
import "../../styles/main.scss";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        
    }

    render() {
        return(
            <div className="container">
                <div className="info">
                    <h2>{this.props.username}</h2>
                </div>
            </div>
        );
    }
}

export default Profile;