import BusinessObject from "./BusinessObject.js"

/**
 * Ertsellt für die einzelnen Request, die sich in RequestListEntry, RequestGroupEntryList, RequestList, 
 * MatchListEnty und GroupListEntry all
 * Soll bei der Anzeige von Requests dienen,
 * aber auch bei hinzufügen von den Request (Anfrage senden)
 * 
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */


export default class RequestBO extends BusinessObject {
    constructor(Arequested_by, Arequested,Arequest_type, Agroup_id) {
      super();
      
      /**
     * @param {int} requested_by - Der User der eine Anfrage gesendet hat, nur der ID wird angezeigt
     * @param {int} requested - Der User der angefragt wurde von einem anderen User, auch wieder nur eine ID
     * @param {string} request_type - Der Requesttype kann entweder E = "Einzelchatraum" oder G = "Gruppenchatraum" stehen
     * @param {int} group_id - Die Gruppen ID wird hier eingetragen --> GroupBO; Nur für Gruppenchaträum gespeichert
     */

      this.requested_by = Arequested_by;
      this.requested = Arequested;
      this.request_type = Arequest_type;
      this.group_id = Agroup_id
    }

    setRequestedBy(Arequested_by){
      this.requested_by = Arequested_by;
    }

    getRequestedBy(){
    return this.requested_by;
    }

    setGroupId(Agroup_id){
        this.group_id = Agroup_id;
    }

    getGroupId(){
        return this.group_id;
    }

    setRequested(Arequested){
        this.requested = Arequested;
    }

    getRequested(){
        return this.requested
    }

    setRequestType(Arequest_type){
        this.request_type = Arequest_type
    }

    getRequestType(){
        return this.request_type
    }

    static fromJSON(request) {
        let result = [];

        if (Array.isArray(request)) {
          request.forEach((c) => {
            Object.setPrototypeOf(c, RequestBO.prototype);
            result.push(c);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let c = request;
          Object.setPrototypeOf(c, RequestBO.prototype);
          result.push(c);
        }

        return result;
      }
    }