import BusinessObject from './Businessobject';

export default class ChataccessBO extends BusinessObject {

    constructor(profilID, room){
        super();
        this.profilID = profilID;
        this.room = room;
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