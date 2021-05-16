import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';

export default class LernappAPI{
    
    //Singelton instance
    static #api = null;
    
    #lernappServerBaseURL = 'http://127.0.0.1:3306/';

    // Chatroom related
    #get_Chatlist = () => '${this.#lernappServerBaseURL}/chat';
    #get_allMessages_fromChatroom = (id) => '${this.#lernappServerBaseURL}/chat/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    })

    /**
     * 
     * @param {int} roomID des Chatraums, von den alle Nachrichten geholt werden sollen 
     * @returns Promise mit einen Array von MessageBOs
     */
    get_allMessages_fromChatroom(roomID){
        return this.#fetchAdvanced(this.#get_allMessages_fromChatroomURL(roomID))
            .then((responseJSON) => {
                let messageBOs = MessageBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(messageBOs);
                })
            })
    }

    /**
     * 
     * @returns Array von ChatroomBOs auf welche der aktuelle User Zugriff hat
     */
    get_Chatlist(){
        return this.#fetchAdvanced(this.#get_Chatlist())
            .then((responseJSON) => {
                let ChatroomBOs = ChatroomBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(messageBOs);
                })
            })

    }

    static getAPI(){
        this.#api = new LernappAPI();
    return this.#api;
    }
    
}