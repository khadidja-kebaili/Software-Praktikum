import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import LernappAPI from '../API/LernappAPI';
import LoadingProgress from './Dialogs/LoadingProgress'

import {Grid,
        Typography,
        withStyles,
        Button } from '@material-ui/core';

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
        //hier muss in der Methode später die ID des aktuellen Users übergeben werden
        LernappAPI.getAPI().get_ChataccessForUser(1).then(ChataccessBOs =>
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

        rooms = this.state.Chataccess;
        res = [];

        for(let i=0; i<rooms.length; i++){
            res.push(LernappAPI.getAPI().get_Chatroom(rooms[i]));
        }

        this.setState({
            Chats: res
        })

        //Nur zum testen die 1
        // LernappAPI.getAPI().get_Chatroom(1).then(ChatroomBOs =>
        //     this.setState({
        //         Chats: ChatroomBOs,
        //         loadingInProgress: false,
        //         error: null
        //     })).catch(e =>
        //         this.setState({
        //             Chats: [],
        //             loadingInProgress: false,
        //             error: e
        //         })
        //     )
        // this.setState({
        //     loadingInProgress: true,
        //     error: null
        // })    
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
                <Grid item>
                    <Typography>

                    </Typography>
                </Grid>
                {Chats.map(chats => <ChatListEntry key={chats.getID()} chats = {chats}/>)}
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