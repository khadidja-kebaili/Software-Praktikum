import BusinessObject from "./BusinessObject"

export default class RequestBO extends BusinessObject {
    constructor(requested_by, delete_request, request_time) {
    super();

    this.requested = delete_request,
    this.requestTime = request_time,
    this.requestedBy = requested_by
}

setRequestedBy(requested_by){
    this.requestedBy = requested_by;
}

getRequestedBy(){
    return this.requestedBy;
}

setRequested(delete_request){
    this.requested = delete_request;
}

getRequested(){
    return this.requested
}

setRequestTime(request_time){
    this.requestTime = request_time
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