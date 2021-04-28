import BusinessObject from './Businessobject';

export default class ChatraumBO extends BusinessObject {
    constructor(){
        RoomID;
        ChatHistory = [];
        Members = [];
    }

    addMessage(message){
        this.ChatHistory.push(message);
        message.setChatcounter(this.ChatHistory.indexOf(message));
    }

    addMember(member){
        this.Members.push(member);
    }


    static fromJSON(message){
    }
}