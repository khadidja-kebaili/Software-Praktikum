import React, {Component} from "react";
import Chatroom from './Pages/Chatroom'
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
     * @param {roomnumber} - Id der ChatraumBO
     */
    constructor(props){
        super(props);
        this.state = {
            chats: props.chats,
            loadingInProgress: false,
            roomnumber: ''
        };
    }

    componentDidMount(){
        this.getRoomnumber()
    }

    getRoomnumber = () => {
        this.setState({
            roomnumber: this.state.chats.getID()
        })
    }

    /**
     * Rendern der Komponente
     */
    render(){
        const{chats, roomnumber} = this.state;
        return(
            <div>
                <Accordion>
                    <AccordionSummary expandIcon = {<ExpandMoreIcon/>}>
                        <Typography>
                            {roomnumber}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {<Chatroom chats={chats} roomnumber={roomnumber}/>}
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
