import BusinessObject from './Businessobject';

export default class ChatraumBO extends BusinessObject {
    constructor(){
        RoomID;
        ChatHistory = [];
        Members = [];
    }

    //fügt die Nachrichts in den Verlauf des Raumes hinzu, damit sie später aus der Datenbank chronologisch geholt werden kann
    addMessage(message){
        this.ChatHistory.push(message);
        message.setChatcounter(this.ChatHistory.indexOf(message));
    }

    //Mitglied in den Chat hinzufügen
    addMember(member){
        this.Members.push(member);
    }


    static fromJSON(message){
    }
}