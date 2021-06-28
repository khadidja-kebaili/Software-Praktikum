import BusinessObject from './BusinessObject';

/**
 * Stellt da, welches Profil auf welchen Chatraum zugreifen kann
 * Bei den Chaträumen wird dabei unter Gruppenchaträume und Zweierchaträume aufgeteilt
 * 
 * @author [Ha Mi Duong](https://github.com/HamiDuong)
 */

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