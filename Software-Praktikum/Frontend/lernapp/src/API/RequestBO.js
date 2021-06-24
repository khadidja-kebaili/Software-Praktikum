import BusinessObject from "./BusinessObject"

export default class RequestBO extends BusinessObject {
    constructor(Arequested_by, Arequested, Arequest_time) {
      super();

      this.requested = Arequested;
      this.requestTime = Arequest_time;
      this.requestedBy = Arequested_by;
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