import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import LernappAPI from '../API';
import LoadingProgress from './Dialogs/LoadingProgress'
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

/**
 * Plan: Zuerst Chataccess für den aktuellen User holen -> Chaträume aller RoomIds holen
 */

class ChatList extends Component{
    constructor(props){
        super(props);

        this.state = {
            Chataccess: [],
            Chats: [],
            loadingInProgress: false,
            error: null
        }
    }

    //Chaträume des aktuellen Users holen
    get_Chataccess = () => {
        LernappAPI.getAPI().get_ChataccessForUser(this.props.profile.getID()).then(ChataccessBOs =>
            this.setState({
                Chataccess: ChataccessBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    Chatsaccess: [],
                    loadingInProgress: false,
                    error: e
                })
            )
        this.setState({
            loadingInProgress: true,
            error: null
        })    
    }

    //muss mit Chataccess verbunden werden, damit nur die benötigten Chats geholt werden
    get_Chats = () => {
        LernappAPI.getAPI().get_Chatroom(getID()).then(ChatroomBOs =>
            this.setState({
                Chats: ChatroomBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    Chats: [],
                    loadingInProgress: false,
                    error: e
                })
            )
        this.setState({
            loadingInProgress: true,
            error: null
        })    
    }

    create_Chat = (room) => {
        LernappAPI.getAPI().addChatroom(room).then(ChatroomBO => {
            this.setState({
                Chats: [...this.state.Chats, ChatroomBO],
                loadingInProgress: false,
                error: null
            })
        }).catch(e =>
            this.setState({
                loadingInProgress: false,
                error: e
            }))
        this.setState({
            loadingInProgress: true,
            error: null
        })
    }

    componentDidMount(){
        this.get_Chataccess();
        this.get_Chats();
    }

    render(){
        const {Chataccess, Chats, loadingInProgress, error} = this.state;
        const {classes} = this.props;

        return(
            <div>
                {Chats.map(groups => <ChatListEntry key={Chats.getID()} Chats = {Chats}/>)}
                <LoadingProgress show={loadingInProgress}/>
                <Button className={classes.addChatroomButton} variant = "contained" startIcon = {<AddIcon/>} onClick = {this.addChatroom}>
                    Add Chatroom
                </Button>

            </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    ChatList: {
        marginBottom: theme.spacing(2),
    },
    addChatroomButton: {
        position: 'absolute',
        right: theme.spacing(3),
        bottom: theme.spacing(1),
    }
});

export default withStyles(styles)(ChatList);