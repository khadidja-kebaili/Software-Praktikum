import React, {Component} from 'react';
import {List,
        ListItem} from "@material-ui/core";
import ChatListEntry from './ChatListEntry';
import LernappAPI from "../API/LernappAPi";
import LernappAPI from '../API/LernappAPI';
import LoadingProgress from './Dialogs/LoadingProgress'
import {Grid, Typography, withStyles, Button } from '@material-ui/core';

class ChatList extends Component{
    constructor(props){
        super(props);

        this.state = {
            Chats: [],
            loadingInProgress: false,
            error: null
        }
    }

    //Chaträume des aktuellen Users holen
    get_Chats = () => {
        //hier muss in der Methode später die ID des aktuellen Users übergeben werden
        LernappAPI.getAPI().get_GroupchatsByProfil(2).then(ChatroomBOs =>
//        LernappAPI.getAPI().get_GroupchatsByProfil(this.props.profile.getID()).then(ChatroomBOs =>
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

    componentDidMount(){
        this.get_Chats();
    }

    componentDidUpdate(){

    }

    //muss mit Chataccess verbunden werden, damit nur die benötigten Chats geholt werden
    // get_Chats = () => {

    //     rooms = this.state.Chataccess;
    //     res = [];

    //     for(let i=0; i<rooms.length; i++){
    //         res.push(LernappAPI.getAPI().get_Chatroom(rooms[i]));
    //     }

    //     this.setState({
    //         Chats: res
    //     })

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

    render(){
        const { Chats, loadingInProgress, error} = this.state;
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <List className={classes.chatList}>
                    {
                        Chats.map(Chats => <ChatListEntry key={Chats.getID()} Chats = {Chats}
                        />)
                    }
                    <ListItem>
                        <LoadingProgress show = {loadingInProgress} />
                    </ListItem>
                </List>
           </div>
        )
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    chatList: {
        marginBottom: theme.spacing(2),
    }
});

export default withStyles(styles)(ChatList);