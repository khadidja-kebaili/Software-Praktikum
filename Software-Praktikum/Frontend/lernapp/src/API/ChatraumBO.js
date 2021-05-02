import BusinessObject from './Businessobject';

/**
 * ChatroomBO beinhaltet alle zugehörigen MessageBO
 * Die gegebenen Variablen
 *  roomID - eindeutiger Schlüssel für die Erkennung der Räume
 *  chatHistory
 *      derzeitiger Plan -> Array
 *      besserer Plan? : JSON -> keine extra Variable benötigt für die chronologische Speicherung
 *  members - User welche Zugriff haben auf dieses ChatroomBO
 */
export default class ChatraumBO extends BusinessObject {
    constructor(){
        roomID;
        chatHistory = [];
        members = [];
    }

    //fügt die Nachrichts in den Verlauf des Raumes hinzu, damit sie später aus der Datenbank chronologisch geholt werden kann
    //vielleicht ist die Speicherung in einer JSON besser?
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