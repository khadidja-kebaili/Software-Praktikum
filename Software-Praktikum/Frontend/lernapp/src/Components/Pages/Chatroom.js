import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 */

const useStyles = makeStyles(theme =>({
    Button:{
    }
}));

class Chatroom extends Component{

    render(){
        return(
            <div>
                <div className="input">
                    <TextField>

                    </TextField>
                </div>
                <div className="send">
                    <Button onClick={this.sendMessage}>Senden</Button>
                </div>
                <div>
                    Nachrichten hier einfügen
                </div>
            </div>
        );
    }

}

export default Chatroom;