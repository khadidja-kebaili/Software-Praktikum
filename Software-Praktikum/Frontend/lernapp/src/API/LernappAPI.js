import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';
import ChataccessBO from './ChataccessBO'

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

    //Chatroom
    #add_ChatroomURL = () => '${this.#lernappServerBaseURL}/chatroom';
    #get_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';
    #delete_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';

    #get_MessagesForChatroomURL = (id) => '${this.#lernappServerBaseURL}/chatroom/${id}';

    //Chataccess
    #add_ChataccessURL = () => '${this.#lernappServerBaseURL}/chataccess';
    #get_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';
    #delete_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    #get_ChataccesForUserURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    //Message
    #add_MessageURL = () => '${this.#lernappServerBaseURL}/messages';
    #get_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';
    #delete_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    });

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
        return this.#fetchAdvanced(this.#delete_ChatroomURL(chatroom), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    get_MessagesForChatroom(chatroom){
        return this.#fetchAdvanced(this.#get_MessagesForChatroomURL(chatroom)).then((responseJSON) => {
            let messageBOs = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(messageBOs);
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
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    //einen Chataccess zurückgeben nach Id
    get_Chataccess(id){
        return this.#fetchAdvanced(this.#get_ChataccessURL(id)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
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
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    //alle Chataccess für einen Nutzer
    get_ChataccessForUser(profil){
        return this.#fetchAdvanced(this.#get_ChataccesForUserURL(profil)).then((responseJSON) => {
            let chataccesBOs = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chataccesBOs);
            })
        })
    }

    //Messages Methoden

    //Message hinzufügen
    add_Message(message){
        return this.#fetchAdvanced(this.#add_MessageURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(message)
        }).them((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    //
    get_Message(message){
        return this.#fetchAdvanced(this.#get_MessageURL(message)).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseMessage);
            })
        })
    }

    delete_Message(message){
        return this.#fetchAdvanced(this.#delete_MessageURL(message), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }


  
}