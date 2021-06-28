import React, {Component} from "react";
import LernappAPI from "../../API/LernappAPI";
import LoadingProgress from "./Dialogs/LoadingProgress";
import {withStyles,
        Button,
        ListItem,
        Typography,
        Divider} from "@material-ui/core";
class ChatlistEntry extends Component{
    constructor(props){
        super(props);
        this.state = {
            chats: props.chats,
            loadingInProgress: false
        }
    }

    componentDidMount(){
    }

    /**
     * Rendern der Komponente
     */
    render(){
        const{chats} = this.state;

        return(
            <div>

            </div>
        )
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
