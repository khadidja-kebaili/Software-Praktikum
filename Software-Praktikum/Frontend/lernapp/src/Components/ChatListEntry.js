import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

class ChatlistEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            Chats: props.Chats
        }
    }

    /**
     * Rendern der Komponente
     */
    render(){
        const{Chats} = this.state;
        return(
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText>
                            {Chats.getGroupname()}
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider/>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%'
    },
    buttonMargin: {
        marginRight: theme.spacing(2),
    },
    ChatlistEntry: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    }
});

export default withStyles(styles)(ChatlistEntry);
