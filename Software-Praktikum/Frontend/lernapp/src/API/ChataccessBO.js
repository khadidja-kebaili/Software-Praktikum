import BusinessObject from './Businessobject';

export default class ChataccessBO extends BusinessObject {

    constructor(profile_id, room, chattype){
        super();
        this.profile_id = profile_id;
        this.room = room;
        this.chattype = chattype;
    }

    set_profile_id(id){
        this.profile_id = id;
    }

    get_profile_id(){
        return this.profile_id;
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