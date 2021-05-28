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

    get_Chats = () => {
        LernappAPI.getAPI().get_Chatlist(this.props.profile.getID()).then(ChatroomBOs =>
            this.setState({
                Chats: ChatroomBOs
            })).catch(e =>
                this.setState({
                    Chats: []
                }))
    }

    componentDidMount(){
        //get
    }

    addChatroom = () => {
        
    }
}