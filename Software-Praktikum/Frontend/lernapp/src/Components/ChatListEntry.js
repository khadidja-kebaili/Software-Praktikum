import React, {Component} from "react";
import Chatroom from './Pages/Chatroom'
import {withStyles,
        Typography,
        Accordion,
        AccordionSummary,
        AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


class ChatlistEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            chats: props.chats,
            loadingInProgress: false,
            roomnumber: props.chats.getID()
        };
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
                            {chats.getID()}
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
