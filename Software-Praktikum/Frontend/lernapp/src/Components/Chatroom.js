import React,  {Component} from 'react';
import { withStyles,
        List} from '@material-ui/core';
import MessageBO from '../API/MessageBO';
import Message from './Message'

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

class Chatroom extends Component{
    /**
     * @param {[MessageBO]} messages - Nachrichten aus diesen Chatraum
     * @param {string} newMessage - Nachricht in dem Sendefeld
     * @param {boolean} loadingInProgress - Anzeige ob die Seite gerade ladet
     * @param {} error - gibt Fehler an
     * @param {int} roomnumber - Id des Raums 
     */
    constructor(props){
        super(props);
        this.state = {
            messages: props.messages,
            newMessage: '',
            loadingInProgress: false,
            error: null,
        }
    }


    // rendert die Komponente
    render(){
        const {newMessage, } = this.state;
        const {classes, messages} = this.props;

        return(
            <div>
                <div id="chat"/>

                <List className={classes.messageHistory}>
                    {
                        messages.map(messages => <Message key={messages.getID()} messages={messages}/>)
                    }
                </List>
                        {/* <TextField
                            id='newMessage'
                            type='text'
                            variant="standard"
                            value={newMessage}
                            defaultValue='Hier Nachricht eingeben'
                            onChange={this.messageInputChange}>
                        </TextField>
                        <Button variant='contained' onClick={this.sendMessageButtonClicked} className={classes.sendButton} color='primary'>
                            Senden
                        </Button> */}
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%'
    }
})

export default withStyles(styles)(Chatroom);