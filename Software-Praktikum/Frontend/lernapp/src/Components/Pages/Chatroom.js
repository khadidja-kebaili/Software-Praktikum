import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 */

class Chatroom extends Component{

    render(){
        return(
            <div>
                <div className="input">
                    <TextField/>
                </div>
                <div className="send">
                    <Button onClick={this.sendMessage}>Senden</Button>
                </div>
            </div>
        );
    }

}

export default Chatroom;