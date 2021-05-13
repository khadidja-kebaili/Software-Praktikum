import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import {BankAPI} from '../api';

class ChatList extends Component{
    constructor(props){
        super(props);
        this.state = {
            Chats: []
        }
    }

    get_Chats = () => {
        BankAPI.getAPI().get_chatsForUser(this.props.profile.getID()).then(ChatroomBOs =>
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