import BusinessObject from './BusinessObject';

/**
 * Bei der Komponente Chatraum wird zwischen Gruppenchats und Zweiterchats underschieden anhand des Chattypes
 * E: Zweierchat
 * G: Gruppenchat
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

export default class ChatroomBO extends BusinessObject {

    /**
     * 
     * @param {string} chattype - Art des Chatraums (Gruppen oder Zweier)
     */
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