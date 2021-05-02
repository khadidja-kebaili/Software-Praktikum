import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Chatroom extends Component{

    render(){
        return(
            <div>
                <div className="texteingabe">
                    <TextField/>
                </div>
                <div className="senden">
                    <Button onClick={this.sendMessage}>Senden</Button>
                </div>
            </div>
        );
    }

}

export default Chatroom;