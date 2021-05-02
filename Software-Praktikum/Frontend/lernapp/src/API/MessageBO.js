import BusinessObject from './Businessobject';

/**
 * Die einzelnen Nachrichten als BO
 * Die gegebenen Variablen
 *  senderID - entspricht der ProfilID des Nachrichtensenders, wird später genutzt um die Nachrichten entsprechend des Nutzers
 *             zu rendern (eigene Nachricht: rechtbündig, andere Nachricht: linksbündig)
 *  raum - entspricht der RaumID des ChatraumBO
 *  text - enthält die Nachricht des MessageBO, entnommen aus der Textfeldeingabe im Chatfenster
 */
export default class MessageBO extends BusinessObject {
    constructor(senderID, raum, text){
        this.senderID = senderID;
        this.raum = raum;
        this.text = text;
    }

    getSenderID(){
        return this.senderID;
    }

    getRaum(){
        return this.raum;
    }

    getText(){
        return this.text;
    }

    static fromJSON(message){
        let result = [];

        if(Array.isArray(message)){
            message.forEach((c) => {
                Object.setPrototypeOf(c, MessageBO.prototype);
                result.push(c);
            })
        }else{
            let c = message;
            Object.setPrototypeOf(c, ProfilBO.prototype);
            result.push(c);
        }
        return result;
    }
}