from .Businessobject import Businessobject;

class ChatAccessBO (Businessobject):
    #Instanziierung des Objekts der Klasse ChatAccess
    def __init__(self):
        super().__init__()
        self.profilID = None;
        self.room = None;
       
    def get_profilID(self):
        return self.senderID;

    def set_profilID(self, id):
        self.profilID = id;

    def get_room(self):
        return self.room;

    def set_room(self, room):
        self.room = room;

    def __str__(self):
        return "Id: {}, Profil {} kann in Raum {}".format(self.get_id(), self.get_profilID(), self.get_room());

#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):
    obj = ChatAccessBO();
    obj.set_id(dictionary["id"]);
    obj.set_profilID(dictionary["profilID"]);
    obj.set_room(dictionary["room"]);
    return obj;