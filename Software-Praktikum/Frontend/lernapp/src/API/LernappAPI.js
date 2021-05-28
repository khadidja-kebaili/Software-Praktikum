import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';

export default class LernappAPI{
    
    //Singelton instance
    static #api = null;
    
    #lernappServerBaseURL = 'http://127.0.0.1:3306/';

    // Chatroom related

    //Räume des aktuellen Benutzer finden
    #get_ChatlistURL = (id) => '${this.#lernappServerBaseURL}/${id}/chatlist';
    //#get_allMessages_fromChatroomURL = (id) => '${this.#lernappServerBaseURL}/chat/${id}';
    
    #get_ChatroomURL = (id) => '${this.#lernappServerBaseURL}/chatroom/${id}';
    #delete_ChatroomURL = (id) => '${this.#lernappServerBaseURL}/chatroom/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    });

    static getAPI(){
        if(this.#api == null){
            this.#api = new LernappAPI();            
        }
        return this.#api;
    }

    /**
     * 
     * @param {int} roomID des Chatraums, von den alle Nachrichten geholt werden sollen 
     * @returns Promise mit einen Array von MessageBOs
     */
    //get_allMessages_fromChatroom(roomID){
    //    return this.#fetchAdvanced(this.#get_allMessages_fromChatroomURL(roomID))
    //        .then((responseJSON) => {
    //            let messageBOs = MessageBO.fromJSON(responseJSON);
    //            return new Promise(function(resolve){
    //                resolve(messageBOs);
    //            })
    //        })
    //}

    /**
     * 
     * @returns Array von ChatroomBOs auf welche der aktuelle User Zugriff hat
     */
    get_Chatlist(profilID){
        return this.#fetchAdvanced(this.#get_ChatlistURL(profilID))
            .then((responseJSON) => {
                let messageBOs = MessageBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(messageBOs);
                })
            })

    }   
}