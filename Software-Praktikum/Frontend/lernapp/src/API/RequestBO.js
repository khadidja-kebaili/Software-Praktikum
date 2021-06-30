import BusinessObject from "./BusinessObject"

export default class RequestBO extends BusinessObject {
    constructor(Arequested_by, Arequested, Arequest_time, Arequest_type) {
      super();

      this.requested = Arequested;
      this.requestTime = Arequest_time;
      this.requestedBy = Arequested_by;
      this.request_type = Arequest_type;
    }

    setRequestedBy(Arequested_by){
      this.requestedBy = Arequested_by;
    }

    getRequestedBy(){
    return this.requestedBy;
    }

    setRequested(Arequested){
        this.requested = Arequested;
    }

    getRequested(){
        return this.requested
    }

    setRequestTime(Arequest_time){
        this.requestTime = Arequest_time
    }

    getRequestTime(){
        return this.requestTime
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