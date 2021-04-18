import react from 'react';
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = () => {
    const {chats, activeChat, username, messages} = props;
    const chat = chats && chats[activeChat];

    const renderMessages = () => {
        const keys = Object.keys(messages);
        //console.log(keys)
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index == 0 ? null : keys [index -1];
            const isMyMessage = userName == message.sender.username;

            return(
                <div key = {'msg_${index}'} style = {{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage/>
                            : <TheirMessage/>
                        }
                    </div>
                    <div className = "read-receipts" style={{marginRight: isMyMessage ? '18px' : '0px'}, {marginLeft: isMyMessage ? '0px' : '68px'}}>
                        read-receipts
                    </div>
                </div>
            )
        })
    }
    renderMessages();

    if(!chat) return 'Loading...'

    return(
        <div className="chat-feed">
            <div className = "chat-title-container">
                <div className = "chat-title">
                    {chat.title}
                </div>
                <div className = "chat-subtitle">
                    {chat.people.map((person) => '${person.peron.unsername}')}
                </div>

            </div>
            {renderMessages()}
            <div style={{height: '100px'}}/>
            <div className = "message-form-container">
                <MessageForm {...props} chatID={activeChat}/>
            </div>
        </div>
    )
}

export default ChatFeed;