import BusinessObject from './Businessobject';

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