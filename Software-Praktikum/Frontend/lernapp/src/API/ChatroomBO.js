import BusinessObject from './Businessobject';

export default class ChatroomBO extends BusinessObject {

    constructor(messages, id){
        super();
        this.messages = messages;
    }

    setMessages(messages){
        this.messages = messages;
    }
 
    getMessages(){
        return this.messages;
    }

    static fromJSON(chatroom){
        let result = [];

        if(Array.isArray(chatroom)){
            chatroom.forEach((c) => {
                Object.setPrototypeOf(c, ChatroomBO.prototype);
                result.push(c);
            })
        }else{
            let c = chatroom;
            Object.setPrototypeOf(c, ChatroomBO.prototype);
            result.push(c);
        }
        return result;
    }
}