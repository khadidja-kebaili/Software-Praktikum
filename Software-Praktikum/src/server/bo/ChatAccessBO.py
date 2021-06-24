from .Businessobject import Businessobject

class ChatAccessBO (Businessobject):
    #Instanziierung des Objekts der Klasse ChatAccess
    def __init__(self):
        super().__init__()
        self.profilID = None
        self.room = None
        self.chattype = None

    def get_profilID(self):
        return self.profilID

    def set_profilID(self, id):
        self.profilID = id
        self.profilID = id

    def get_profilID(self):
        return self.profilID

    def get_room(self):
        return self.room

    def set_room(self, room):
        self.room = room

    def get_chattype(self):
        return self.chattype

    def set_chattype(self, type):
        self.chattype = type

    def __str__(self):
        return "Id: {}, Profil {} kann in Raum {}, Type: ".format(self.get_id(), self.get_profilID(), self.get_room(), self.get_chattype())

#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):
    obj = ChatAccessBO()
    obj.set_id(dictionary["id"])
    obj.set_profilID(dictionary["profilID"])
    obj.set_room(dictionary["room"])
    obj.set_chattype(dictionary["chattype"])
    return obj