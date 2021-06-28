import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LernappAPI from '../../API/LernappAPI'
import { withStyles, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';

import MessageBO from '../../API/MessageBO';
import Message from '../Message'
import LoadingProgress from '../Dialog/LoadingProgress';

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 */
class Chatroom extends Component{

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            // users: [],
            newMessage: '',
            loadingInProgress: false,
            error: null,
            roomnumber: props.roomnumber
        }
    }

    // hier muss später der Current User übergeben werden
    getMessages = () => {
        LernappAPI.getAPI().getMessageByRoom(1).then(messageBOs =>
            this.setState({
                messages: messageBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    messages: [],
                    loadingInProgress: false,
                    error: e
                })
            );
        this.setState({
            loadingInProgress: true,
            error: null
        });         
    }

/*     getUsers = () => {
        res = []
        LernappAPI.getAPI().getChataccessByRoom().then(ChataccessBOs =>
            ChataccessBOs.forEach(elem => {
                res.push(elem.get_profile_id)                
            }),
            this.setState({
                users: res,
                loadingInProgress: false,
                error: null
            })
        ).catch(e =>
            this.setState({
                users: [],
                loadingInProgress: false,
                error: e
            }))
            this.setState ({
                loadingInProgress: true,
                error: null
        })
    } */

    componentDidMount(){
        this.getMessages();
    }

    //Input wird zu MessageBO umgewandelt und an die Datenbank geschickt
    sendMessageButtonClicked = event => {
        event.stopPropagation();
        /**
         * Curerent User
         * Current Room
         */
        let message = new MessageBO(
            1,
            1,
            this.state.newMessage
        )
        LernappAPI.getAPI().addMessage(message).then(console.log(message));
        setTimeout(() => {  console.log("Warten auf Datenbank"); }, 3000);
        this.getMessages();
        this.renderMessage(this.state.messages);
    }

    messageInputChange = e => {
        const value = e.target.value
        this.setState({
            newMessage: value
        })
    }

    // Rendermethode und alle Nachrichten als TextNodes in einen Div einfügen
    renderMessage(msg){
        var parent = document.getElementById("chat")
        if(parent != null){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            } 
        }
        
        msg.forEach(elem => {
            var txt = elem.profile_id+" : "+elem.text;
            var newdiv =  document.createElement("div");
            var content = document.createTextNode(txt)
            newdiv.appendChild(content);
            parent.appendChild(newdiv)            
        });

    }

    render(){
        const {messages, newMessage, loadingInProgress, error} = this.state;
        const {classes, chats} = this.props;

        return(
            <div>
                <List className='messages'>
                    {
                        messages.map(messages => <Message key={messages.getID()} messages={messages}/>)
                    }
{/*                     {
                        messages.map(() => this.renderMessage(messages))
                    } */}
                    <ListItem>
                        <LoadingProgress show={loadingInProgress}/>
                    </ListItem>
                </List>
                <div id="chat"/>
                <Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='newMessage'
                            type='text'
                            variant="outlined"
                            value={newMessage}
                            defaultValue='Hier Nachricht eingeben'
                            onChange={this.messageInputChange}>
                        </TextField>
                        <Button variant='contained' onClick={this.sendMessageButtonClicked}>
                            Senden
                        </Button>
                    </Grid>
                </Grid>
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