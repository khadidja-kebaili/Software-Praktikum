import BusinessObject from "./BusinessObject.js"

export default class RequestBO extends BusinessObject {
    constructor(Arequested_by, Arequested,Arequest_type) {
      super();
      
      
      this.requested_by = Arequested_by;
      this.requested = Arequested;
      this.request_type = Arequest_type;
    }

    setRequestedBy(Arequested_by){
      this.requested_by = Arequested_by;
    }

    getRequestedBy(){
    return this.requested_by;
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