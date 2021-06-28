import React,  {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LernappAPI from '../../API/LernappAPI'
import { withStyles, Typography, TableContainer, Table, TableHead, TableCell, Paper, TableRow, TableBody, Link, Grid } from '@material-ui/core';

import MessageBO from '../../API/MessageBO';
import AddMessage from '../Dialog/AddMessage';
import { blue, red } from '@material-ui/core/colors';

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
            error: null
        }
    }

    getMessages = () => {
//        LernappAPI.getAPI().getMessageByRoom(1).then(messageBOs =>
        LernappAPI.getAPI().getAllMessage().then(messageBOs =>
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

    componentDidUpdate(){

    }

    //Input wird zu MessageBO umgewandelt und an die Datenbank geschickt
    sendMessageButtonClicked = event => {
        event.stopPropagation();
        /**
         * Curerent User
         * Current Room
         * Input from Textfield
         */
        let message = new MessageBO(
            1,
            2,
            this.state.newMessage
        )
        console.log(this.state.messages)
        LernappAPI.getAPI().addMessage(message).then(console.log(message));
    }
    

/*     alte Idee die Nachrichten zu rendern

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
 */
    messageInputChange = e => {
        const value = e.target.value
        this.setState({
            newMessage: value
        })
    }

    render(){
        const {messages, newMessage, loadingInProgress, error} = this.state;
        const {classes} = this.props;

        return(
            <div>
                <Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='newMessage'
                            type='text'
                            value={newMessage}
                            onChange={this.messageInputChange}>
                        </TextField>
                        <Button variant='contained' onClick={this.sendMessageButtonClicked}>
                            Senden
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant='contained' onClick={this.getMessages}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
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