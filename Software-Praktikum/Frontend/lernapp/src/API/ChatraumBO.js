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
    
    ChatroomBO(){
        this.roomID = set_roomID();
        this.chatHistory = [];

        if(get_gruppenmitglieder != NONE){
            this.members = get_gruppenmitglieder;
        }
        else{
            //ProfilID von dem aktuellen User und dem Match werden gespeichert
            this.members = [get_profilID, get_MatchID];
        }
    }

    get_roomID(){
        return this.roomID;
    }

    set_chatHistory(array){
        this.chatHistory = array;
    }

    set_roomID(){
        //Größte RaumID wird gesucht und die nächstgrößte wird gewählt
    }

    //fügt die Nachrichts in den Verlauf des Raumes hinzu, damit sie später aus der Datenbank chronologisch geholt werden kann
    //vielleicht ist die Speicherung in einer JSON besser?
    addMessage(message){
        this.ChatHistory.push(message);
        message.set_chatroomCounter(this.ChatHistory.indexOf(message));
    }

    //Mitglied in den Chat hinzufügen
    addMember(member){
        this.Members.push(member);
    }

    /**
     * Pseudocode
     * alle Nachrichten mit der gleichen ChatroomID werden in ein Array gestellt -> sortieren nach ChatroomCounter
     */
    sort_Messages(){
        erg = [];
        ret = []
        for (i; i<= maxChatroomID; i++){
            if(i == get_roomID){
                erg.push (elem);
            }
            elem.sort();
            a = ChatroomBO();
            a.ChatHistory = erg;
            a.maxChatroomID = i;
            ret.push(a);
        }
        return ret;
    }

    static fromJSON(message){
    }
}