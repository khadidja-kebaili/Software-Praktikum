import BusinessObject from './BusinessObject';

export default class ChataccessBO extends BusinessObject {

    constructor(profilID, room, chattype){
        super();
        this.profilID = profilID;
        this.room = room;
        this.chattype = chattype;
    }

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

    set_chattype(chattype){
        this.chattype = chattype;
    }

    get_chattype(){
        return this.chattype;
    }
 
    static fromJSON(chataccess){
        let result = [];

        if(Array.isArray(chataccess)){
            chataccess.forEach((c) => {
                Object.setPrototypeOf(c, ChataccessBO.prototype);
                result.push(c);
            })
        }else{
            let c = chataccess;
            Object.setPrototypeOf(c, ChataccessBO.prototype);
            result.push(c);
        }
        return result;
    }
}