#from server.bo.NamedBusinessObject import NamedBusinessObject


class Gruppe(Object):# es muss eine Oberklasse her z.b.ProfilObject
    
    def __init__(self):
        self._Gruppen_nr = None #Gruppen-Nummer

    def get_Gruppen_nr(self):
        # Auslesen der Gruppen-Nummer 
        return self._Gruppen_nr

    def set_Gruppen_nr(self, Gruppen_nr):
        #Setzen der Gruppen-Nummer 
        self._Gruppen_nr = Gruppen_nr

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        #Umwandeln eines Python dict() in ein Python Objekt Modul()
        obj = Gruppe(Object)
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
        obj.set_edv_nr(dictionary["Gruppen_nr"]) 
        return obj