import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';

export default class LernappAPI{
    
    //Singelton instance
    static #api = null;

    static getAPI(){
        if (this.#api == null){
            this.#api = new LernappAPI();
        }
        return this.#api;
    }
    
    #lernappServerBaseURL = 'http://127.0.0.1:3306/';

    #add_ChatroomURL = () => '${this.#lernappServerBaseURL}/chatroom';
    #get_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';
    #delete_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';

    #add_ChataccessURL = () => '${this.#lernappServerBaseURL}/chataccess';
    #get_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';
    #delete_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    });

    //Message Methoden

    //Chatroom Methoden
    add_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#add_ChatroomURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatroom)
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    get_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#get_ChatroomURL(chatroom)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChatroom);
            })
        })
    }

    delete_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#delete_ChatroomURL(), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    //Chataccess Methoden

    //User erhält Zugriff auf einen Chat
    add_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#add_ChataccessURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chataccess)
        }).them((responseJSON) => {
            let responseChataccess = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    //alle zugreifbaren Chats eines Users
    get_Chataccess(profil){
        return this.#fetchAdvanced(this.#get_ChataccessURL(profil)).then((responseJSON) => {
            let responseChataccess = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChataccess);
            })
        })
    }

    //Zugriff wegnehmen von einem User
    delete_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#delete_ChataccessURL(chataccess), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChataccess = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }


  
}