export default class BusinessObject{

    constructor(){
        this.id = 0;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    toString(){
        let result = '';
        for (var prop in this){
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }

}