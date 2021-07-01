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

    // holt alle zugehörigen Nachrichten für einen Chatraum
    // getMessages = () => {
    //     LernappAPI.getAPI().getMessageByRoom(this.state.roomnumber).then(messageBOs =>
    //         this.setState({
    //             messages: messageBOs,
    //             loadingInProgress: false,
    //             error: null
    //         })).catch(e =>
    //             this.setState({
    //                 messages: [],
    //                 loadingInProgress: false,
    //                 error: e
    //             })
    //         );
    //     this.setState({
    //         loadingInProgress: true,
    //         error: null
    //     });         
    // }

    // getUserNames = () => {
    //     var map = new Map();
    //     let msg = this.state.messages;
    //     let ids = [];
    //     msg.forEach(elem => {
    //         ids.push(elem.get_profile_id());
    //     });
    //     let unique = [...new Set(ids)];
    //     console.log(unique);

    //     unique.forEach(id => {
    //         LernappAPI.getAPI().getProfile(id).then( profile =>
    //             map.set(id, profile.getFirstname())
    //         )
    //     });
    // };

    //componentDidMount(){
        // etMessages wird alle 1000ms aufgerufen um einen aktuellen Chatverlauf zu ermöglichen
        // this.interval = setInterval(() => this.getMessages(), 5000)
        // this.getMessages();
        // this.getUserNames();
    //}

    //Input wird zu MessageBO umgewandelt und an die Datenbank geschickt
    // sendMessageButtonClicked = () => {
    //     /**
    //      * Curerent User
    //      */
    //     console.log(this.state.roomnumber)
    //     let message = new MessageBO(
    //         1,
    //         this.state.roomnumber,
    //         this.state.newMessage
    //     )
    //     LernappAPI.getAPI().addMessage(message).then(console.log(message));
    // }

    // // newMessage wird an die Eingabe im Inputfeld angepasst
    // messageInputChange = e => {
    //     const value = e.target.value
    //     this.setState({
    //         newMessage: value
    //     })
    // }

    /**
     * Rendermethode und alle Nachrichten als TextNodes in einen Div einfügen
     * @param {[MessageBO]} msg - der Nachrichtenverlauf einen Chats
     */
    // renderMessage(msg){
    //     var parent = document.getElementById("chat")
    //     if(parent != null){
    //         while(parent.firstChild){
    //             parent.removeChild(parent.firstChild);
    //         }
    //     }

    //     msg.forEach(elem => {
    //        var txt = elem.profile_id+" : "+elem.text;
    //        var newdiv =  document.createElement("div");
    //        var content = document.createTextNode(txt)
    //        newdiv.appendChild(content);
    //        parent.appendChild(newdiv)
    //     });

    // }

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