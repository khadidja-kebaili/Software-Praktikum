import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';

import Message from '../Message';
import MessageBO from '../../API/MessageBO'
import { blue, red } from '@material-ui/core/colors';
import { LernappAPI } from '../../API';

/**
 * geöffneter Chat mit zugehörigen Nachrichten
 */
class Chatroom extends Component{

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            loadingInProgress: false,
            error: null
        }
    }

    getMessages = () => {
        LernappAPI.getAPI().getMessageByRoom(1).then(MessageBOs =>
            this.setState({
                messages: MessageBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    messages: [],
                    loadingInProgress: false,
                    error: e
                })
            )
        this.setState({
            loadingInProgress: true,
            error: null
        })         
    }

    componentDidMount(){
        this.getMessages()
    }

    componentDidUpdate(){

    }

    //Input wird zu MessageBO umgewandelt und an die Datenbank geschickt
    sendMessageButtonClicked = (event) => {
        /**
         * Curerent User
         * Current Room
         * Input from Textfield
         */
        let message = new MessageBO(
            1,
            2,
            "Test"
        )
        LernappAPI.getAPI().add_Message(message);
    }
    

    render_messages() {
        var parent = document.getElementById("chat");
        //parent.innerHTML = "";
        //var messageMapper = new MessageMapper();
        //var res = messageMapper.find_by_room(this.get_id);
        
        //MessageBO müssen aus der Datenbank geholt werden ->

        //Testversion um Methode zu testen
        var res = [];
        
        //Fake Backend
        var mes = new Message();
        mes.profilID = 1;
        mes.room = 1;
        mes.text = "Hallo";

        var mes2 = new Message();
        mes2.profilID = 2;
        mes2.room = 1;
        mes2.text = "Tschau";

        res.push(mes, mes2);

        res.forEach(elem => {
            var newdiv = document.createElement("div");
            var content = document.createTextNode(elem.text);
            newdiv.appendChild(content);
            //Hier muss die ID des aktuellen Users geprüft werden, nicht 1
            if(elem.profilID === 1){
                newdiv.classList.add("ownmessage");
            //Wenn nicht aktueller User
            }else{
                newdiv.classList.add("othermessage");
            }
            parent.appendChild(newdiv);
        });
    }

    render(){
        const {Messages, loadingInProgress, error} = this.state;
        const {classes} = this.props;

        return(
            <div>
                //Die Nachrichten des Chats hier
                <div id="chat">

                </div>

                //Eingabefeld für neue Nachrichten
                <div className="input">
                    <TextField/>
                </div>
                <div className="send">
                    <Button className={classes.addMessageButton} variant='contained' onClick={this.sendMessageButtonClicked}>Senden</Button>
                    <Button onClick={this.update_messages}>Updaten</Button>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
        ownmessage: {
            color: red,
        },
        othermessage: {
            color: blue,
        }
})

export default withStyles(styles)(Chatroom);