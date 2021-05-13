import BusinessObject from './Businessobject';

export default class ChatroomBO extends BusinessObject {

    constructor(){
        super();
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