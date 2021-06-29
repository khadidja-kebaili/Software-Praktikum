import React, {Component} from "react";
import Chatroom from './Chatroom';
import ProfileBO from "../API/ProfileBO";
import LernappAPI from "../API/LernappAPI";
import {withStyles,
        Typography,
        Accordion,
        AccordionSummary,
        AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


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
            name: '',
            partner: ''
        };
    }

    /**
     * Nachrichten eines Chats holen
     */
    getMessages = () => {
        LernappAPI.getAPI().getMessageByRoom(this.state.roomnumber).then(messageBOs =>
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

    // getNameOfProfile(){
    //     LernappAPI.getAPI().getChatpartner(1, 1).then( profile =>
    //         this.setState({
    //             name : profile[0].getFirstname()
    //         })
    //     )

        // var value_p = LernappAPI.getAPI().getProfile(2)
        // console.log(typeof(value_p))

        //     this.setState({
        //         loadingInProgress: false,
        //         partner: value_p
        //     })
        // console.log("State bei Profile")
        // console.log(this.state.partner)

    componentDidMount(){
        this.getNameOfChat()
    }

    /**
     * Rendern der Komponente
     * Dabei besteht jeder Entry aus dem Namen des Chats und wenn man da Akkordion öffnet liegt der zugehörige Chatraum
     */
    render(){
        const{chats, roomnumber, name, partner} = this.state;
        return(
            <div>
                <Accordion>
                    <AccordionSummary expandIcon = {<ExpandMoreIcon/>}>
                        <Typography>
                            {roomnumber} : {name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {<Chatroom chats={chats} roomnumber={roomnumber} partner={partner}/>}
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%'
    }
});

export default withStyles(styles)(ChatlistEntry);
