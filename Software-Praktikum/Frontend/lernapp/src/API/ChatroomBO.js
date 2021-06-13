import BusinessObject from './Businessobject';

export default class ChatroomBO extends BusinessObject {

    constructor(groupname, messages, id){
        super();
        this.groupname = groupname;
        this.messages = messages;
        this.id = id;
    }

    setGroupname(groupname){
        this.groupname = groupname;
    }

    getGroupname(){
        return this.groupname;
    }

    setMessages(messages){
        this.messages = messages;
    }
 
    getMessages(){
        return this.messages;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
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