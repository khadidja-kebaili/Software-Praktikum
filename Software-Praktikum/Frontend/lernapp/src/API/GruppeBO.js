//import BusinessObject from "./src/BusinessObject

export default class GruppeBO extends BusinessObject{

	/*
	constructor(){
        super();
    }
    */
	
	/** 
   * Returns an Array of SemesterBOs from a given JSON structure
   */
    static fromJSON(Gruppe) {
		let results = null;
		if (Array.isArray(Gruppe)) {
			results = [];
			Gruppe.forEach((c) => {
				Object.setPrototypeOf(c, GruppeBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt nur ein Objekt
			let c = Gruppe;
			Object.setPrototypeOf(c, Gruppe.prototype);
			results = c;
		}
		return results;
	}
}