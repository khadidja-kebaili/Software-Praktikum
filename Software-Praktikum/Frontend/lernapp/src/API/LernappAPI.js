import MessageBO from './MessageBO';

export default class LernappAPI{
    static #api = null;
    
    static getAPI(){
        this.#api = new LernappAPI();
    return this.#api;
    }

    #lernappServerBaseURL = 'http://127.0.0.1:5000/';

    #getProfilURL = () => '${this.#lernappServerBaseURL}/chat';
    #addProfilURL = (id) => '${this.#lernappServerBaseURL}/chat/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    })

    
}