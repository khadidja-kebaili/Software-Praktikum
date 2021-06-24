import React, {Component} from "react";
import {withStyles,
        Button,
        ListItem,
        Typography,
        Divider} from "@material-ui/core";
import LernappAPI from '../API/LernappAPI';
import LoadingProgress from "./Dialogs/LoadingProgress";

class ChatlistEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            loadingInProgress: false,
        }
    }

    componentDidMount(){

    }

    /**
     * Rendern der Komponente
     */
    render(){
        const{loadingInProgress} = this.state;
        const{classes, Chats} = this.props;

        return(
            <div>
                <ListItem button>
                    <Typography className = {classes.chatEntry}>
                        Chat Nummer {Chats.getID()}
                    </Typography>
                </ListItem>
                <ListItem>
                    <LoadingProgress show = {loadingInProgress} />
                </ListItem>
                <Divider />
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
    chatEntry:{
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    }
});

export default withStyles(styles)(ChatlistEntry);
