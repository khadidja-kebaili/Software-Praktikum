import React, { Component } from 'react';
import LernappAPI from "../../API/LernappAPI";
import MessageBO from '../../API/MessageBO';
import {TextField, Button} from '@material-ui/core/';

class AddMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            profil: null,
            room: null,
            text: null
        }
    }

    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value });}

    sendMessage = () => {
        let message = new MessageBO(
            //this.state.profile_id,
            1,
            //this.state.room,
            1,
            this.state.text
        )
        LernappAPI.getAPI().addMessage(message).then(console.log(message))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.sendMessage}>
                    <div className="InputMessage">
                        <TextField name="message" variant="outlined" value ={this.state.text}/>
                    </div>
                </form>
                <div className="SendButton">
                    <Button className="sending" type="submit" variant="contained" onClick={this.sendMessage}>
                        Senden
                    </Button>
                </div>
            </div>

        );
    }
}

export default AddMessage;