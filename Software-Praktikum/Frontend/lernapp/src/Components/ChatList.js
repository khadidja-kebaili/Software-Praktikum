import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import {LernappAPI} from '../api';

class ChatList extends Component{
    constructor(props){
        super(props);
        this.state = {
            Chats: []
        }
    }

    //Chaträume des aktuellen Users holen
    get_Chats = () => {
        LernappAPI.getAPI().get_Chataccess(this.props.profile.getID()).then(ChatroomBOs =>
            this.setState({
                Chats: ChatroomBOs
            })).catch(e =>
                this.setState({
                    Chats: []
                }))
    }

    componentDidMount(){
        this.get_Chats();
    }

    addChatroom = () => {
        LernappAPI.getAPI().add_Chataccess(this.props.profile.getID()).then(ChataccessBO =>)
        
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default ChatList;