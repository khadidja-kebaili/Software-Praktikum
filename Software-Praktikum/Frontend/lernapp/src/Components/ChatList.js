import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import LernappAPI from '../API/LernappAPI';
import LoadingProgress from './Dialog/LoadingProgress';
import {withStyles,
        } from '@material-ui/core';

/**
 * Zeigt alle zugreifbaren Chats des aktuellen Users
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

class ChatList extends Component{
    /**
     * 
     * @param {[ChatroomBO]} chats - alle ChatroomBOs auf die der aktuelle User zugreifen kann 
     * @param {boolean} loadingInProgress - Anzeige ob die Seite gerade ladet
     * @param {} error - gibt Fehler an 
    */
    constructor(props){
        super(props);

        this.state = {
            chats: [],
            loadingInProgress: false,
            error: null
        }
    }

    // Chaträume des aktuellen Users holen
    getChats = () => {
        let data = this.props.googleId;
        console.log(data);
        LernappAPI.getAPI().getChataccessByProfile(data).then(ChatroomBOs =>
            this.setState({
                chats: ChatroomBOs,
                loadingInProgress: false,
                error: null,
            })).catch(e =>
                this.setState({
                    chats: [],
                    loadingInProgress: false,
                    error: e,
                })
            )
            this.setState({
                loadingInProgress: true,
                error: null,
            })
    }

    componentDidMount(){
        this.getChats();
    }

    render(){
        const {chats, loadingInProgress} = this.state;

        return (
            <div>
                {
                    chats.map( chats => <ChatListEntry key={chats.getID()} chats={chats} googleId={this.props.googleId}/>)
                }
                <LoadingProgress show={loadingInProgress}/>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    }
});

export default withStyles(styles)(ChatList);