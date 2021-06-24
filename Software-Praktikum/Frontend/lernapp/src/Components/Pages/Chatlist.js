import React, {Component} from 'react';
import LernappAPI from '../../API/LernappAPi';

class Chatlist extends Component{

    constructor(props){
        super(probs);
        this.state = {
            chats: [],
        };
    }

    componentDidMount(){
        this.get_Chatroom();
    }

    get_Chatroom = () => {
        LernappAPI.getAPI.get_Chatroom().then(chatroom =>
            this.setState({
                chats: chatroom,
            }))
    }

    render(){
        return(
            <div>
                <Typography>Deine Chats:</Typography>
                <br/>
                
            </div>
        )
    }
}

export default Chatlist;