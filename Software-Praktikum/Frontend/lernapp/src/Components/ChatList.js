import React, {Component} from 'react';
import ChatListEntry from './ChatListEntry';
import LernappAPI from "../API/LernappAPi";

class ChatList extends Component{
    constructor(props){
        super(props);

        this.state = {
            Chataccess: [],
            Chats: [],
            error: null
        }
    }

    //Chaträume des aktuellen Users holen
    get_Chataccess = () => {
        LernappAPI.getAPI().get_ChataccessForUser(this.props.profile.getID()).then(ChataccessBOs =>
            this.setState({
                Chataccess: ChataccessBOs
            })).catch(e =>
                this.setState({
                    Chatsaccess: []
                }))
    }

    // get_Chats = () => {
    //     LernappAPI.getAPI().get_
    // }

    componentDidMount(){
        this.get_Chats();
    }

    addChatroom = () => {
        LernappAPI.getAPI().add_Chataccess(this.props.profile.getID()).then(ChataccessBO =>
            this.setState({
                Chats: ChatroomBOs
            })).catch(e =>
                this.setState({
                    
                }))
        
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default ChatList;