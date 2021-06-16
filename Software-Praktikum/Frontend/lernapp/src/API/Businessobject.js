<<<<<<< HEAD
<<<<<<< HEAD
export default class BusinessObject {
    constructor() {
        this.id = 0;
    }

    /**
     * Sets the ID of this BusinessObject.
     *
     * @param {*} aId - the new ID of this BusinessObject
     */
    setID(aId) {
        this.id = aId;
    }

=======

 export default class BusinessObject {

 
    constructor() {
      this.id = 0;
    }
  
    /**
     * Sets the ID of this BusinessObject.
     * 
     * @param {*} aId - the new ID of this BusinessObject
     */
    setID(aId) {
      this.id = aId;
    }
  
>>>>>>> origin/Mihri
    /**
     * Returns the ID of this BusinessObject.
     */
    getID() {
<<<<<<< HEAD
        return this.id;
    }

=======
      return this.id;
    }
  
>>>>>>> origin/Mihri
    /**
     * Returns a string representation of this Object. This is useful for debugging purposes.
     */
    toString() {
<<<<<<< HEAD
        let result = '';
        for (var prop in this) {
=======
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
>>>>>>> origin/Zusammenbringen
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }
<<<<<<< HEAD
=======

>>>>>>> origin/Zusammenbringen
}
=======
      let result = '';
      for (var prop in this) {
        result += prop + ': ' + this[prop] + ' ';
      }
      return result;
    }
  }
>>>>>>> origin/Mihri
