import React, {Component} from 'React';
import {StreamChat} from 'stream-chat';

import {ChatEngine} from 'react-chat-engine';
import './Chat.css';
import ChatFeed from '.Components/ChatFeed'

const Chat = () => {
    return(
        <ChatEngine
            height = "100vh"
            projectID = ""
            userName = ""
            userSecret = ""
            renderChatFeed = {(chatAppProps) => <ChatFeed {... chatAppProps}/>}
        />
    );
}


/*const Client = StreamChat.getInstance('');
const userToken = getUserId();

Client.connectUser(
    {
        id: getUserId(),
        name: getUserName,
        image: getProfilePicture,
    },
    userToken,
);

const Chat = () => (
    <Chat client={chatClient} theme='messaging light'>
    </Chat>
);
*/

export default Chat;