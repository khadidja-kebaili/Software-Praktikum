import React, {Component} from "react";
import Chatroom from './Chatroom';
import LernappAPI from "../API/LernappAPI";
import {withStyles,
        Typography,
        Accordion,
        AccordionSummary,
        AccordionDetails,
        TextField,
        Button,
        List,
        ListItem} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MessageBO from "../API/MessageBO";

/**
 * Die Einträge von der Komponente ChatList
 * Die Komponente wird als Accordion erstellt mit dem Chatraum im AccordionDetails
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

class ChatlistEntry extends Component{
    /**
     * @param {ChatroomBO} chats - eine ChatroomBO
     * @param {boolean} loadingInProgress - Anzeige ob die Seite gerade ladet
     * @param {roomnumber} roomnumber- Id der ChatraumBO
     * @param {string} name - Name des Chatraums -> wenn Gruppenchat = Gruppenname, sonst = Chatpartner
     */
    constructor(props){
        super(props);
        this.state = {
            chats: props.chats,
            loadingInProgress: false,
            roomnumber: '',
            newMessage: '',
            name: '',
            messages: []
        };
    }

    /**
     * Gibt die Id des Chatraums wieder
     */
    // getRoomnumber = () => {
    //     this.setState({
    //         loadingInProgress: false,
    //         roomnumber: this.state.chats.getID()
    //     })
    // }

    /**
     * Methode um den Namen der Chaträume zu bestimmen
     * Bei einem Gruppenchatraum ist es der Gruppenname
     * Bei einem Zweierchatraum ist es der Vorname der anderen Person
     */
    getNameOfChat = () => {
        var roomtype = this.state.chats.getChatType();
        if(roomtype == 'E'){
            LernappAPI.getAPI().getChatpartner(1, 1).then( profile =>
                this.setState({
                    roomnumber: this.state.chats.getID(),
                    name : profile[0].getFirstname()
                })
            )
        }else if (roomtype == 'G'){
            LernappAPI.getAPI().getGroup(this.state.chats.getID()).then(groupBO =>
                this.setState({
                    loadingInProgress: false,
                    roomnumber: this.state.chats.getID(),
                    name: groupBO.getGroupname()
                })).catch(e =>
                    this.setState({
                        loadingInProgress: false,
                        roomnumber: '',
                        name: ''
                }))
            this.setState({
                loadingInProgress: true
            })
        }
    }

    /**
     * Nachrichten eines Chats holen
     * Hier wurde eine Callback Funktion benötigt, sonst wurde der State nicht geändert
     */
    getMessages = () => {
        LernappAPI.getAPI().getMessageByRoom(this.state.chats.getID()).then(messageBOs =>
            this.setState({
                messages: messageBOs,                    
            }, function(){
                console.log("this.state.messages")
            }
            )
        );       
    }

    //Input wird zu MessageBO umgewandelt und an die Datenbank geschickt
    sendMessageButtonClicked = () => {
        /**
         * Curerent User
         */
        console.log(this.state.roomnumber)
        let message = new MessageBO(
            1,
            this.state.roomnumber,
            this.state.newMessage
        )
        LernappAPI.getAPI().addMessage(message).then(console.log(message));
    }

    // newMessage wird an die Eingabe im Inputfeld angepasst
    messageInputChange = e => {
        const value = e.target.value
        this.setState({
            newMessage: value
        })
    }    

    componentDidMount(){
        this.getNameOfChat()
        this.interval = setInterval(() => this.getMessages(), 5000)
    }

    /**
     * Rendern der Komponente
     * Dabei besteht jeder Entry aus dem Namen des Chats und wenn man da Akkordion öffnet liegt der zugehörige Chatraum
     */
    render(){
        const{roomnumber, name, messages, newMessage} = this.state;
        const{classes} = this.props;

        return(
            <div>
                <Accordion>
                    <AccordionSummary expandIcon = {<ExpandMoreIcon/>}>
                        <Typography>
                            {roomnumber} : {name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            <ListItem>
                                {<Chatroom roomnumber={roomnumber} messages={messages}/>}
                            </ListItem>
                            <ListItem>
                                <div>
                                    <TextField
                                        id='newMessage'
                                        type='text'
                                        variant="standard"
                                        value={newMessage}
                                        defaultValue='Hier Nachricht eingeben'
                                        onChange={this.messageInputChange}>
                                    </TextField>
                                    <Button variant='contained' onClick={this.sendMessageButtonClicked} className={classes.sendButton} color='primary'>
                                        Senden
                                    </Button>
                                </div>
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%'
    },
    sendButton: {
        margin: '5px',
        
    }
})

export default withStyles(styles)(ChatlistEntry);
