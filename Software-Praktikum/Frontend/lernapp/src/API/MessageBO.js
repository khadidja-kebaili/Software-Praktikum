import BusinessObject from './Businessobject';

/**
 * Die einzelnen Nachrichten als BO
 */
export default class MessageBO extends BusinessObject {

    /**
     * 
     * @param {*} profilID 
     * @param {*} room 
     * @param {*} text 
     * @param {*} time
     */
    constructor(profilID, room, text){
        super();
        this.profilID = profilID;
        this.room = room;
        this.text = text;
        //Plan: Zeitpunkt des Sendens speichern
        this.time = Date.now;
    }

    //Getter und Setter Methoden für die Objekte der Klasse MessageBO
    set_profilID(id){
        this.profilID = id;
    }

    get_profilID(){
        return this.profilID;
    }

    set_room(id){
        this.room = id;
    }

    get_room(){
        return this.room;
    }

    set_text(text){
        this.text = text;
    }

    get_text(){
        return this.text;
    }

    set_time(time){
        this.time = time;
    }

    get_time(){
        return this.time;
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
            Object.setPrototypeOf(c, MessageBO.prototype);
            result.push(c);
        }
        return result;
    }
}