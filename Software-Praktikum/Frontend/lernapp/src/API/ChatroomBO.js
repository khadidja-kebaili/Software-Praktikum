import BusinessObject from './BusinessObject';

export default class ChatroomBO extends BusinessObject {

    constructor(chattype){
        super();
        this.chattype = chattype;
    }

    setChatType(chattype){
        this.chattype = chattype
    }

    getChatType(){
        return this.chattype
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