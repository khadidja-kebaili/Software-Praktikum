import BusinessObject from './BusinessObject';

/**
 * Die einzelnen Nachrichten als BO
 */
export default class MessageBO extends BusinessObject {

    constructor(profil_id, room, text){
        super();
        this.profil_id = profil_id;
        this.room = room;
        this.text = text;
    }

    //Getter und Setter Methoden für die Objekte der Klasse MessageBO
    set_profil_id(id){
        this.profil_id = id;
    }

    get_profil_id(){
        return this.profil_id;
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