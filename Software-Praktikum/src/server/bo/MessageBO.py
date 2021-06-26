from src.server.bo.Businessobject import Businessobject

class MessageBO (Businessobject):
    #Instanziierung des Objekts der Klasse Message
    def __init__(self):
        super().__init__()
        self.profilID = None
        self.room = None
        self.text = None
#        self.time = None;

    def get_profilID(self):
        return self.profilID

    def set_profilID(self, id):
        self.profilID = id

    def get_room(self):
        return self.room

    def set_room(self, room):
        self.room = room

    def get_text(self):
        return self.text

    def set_text(self, text):
        self.text = text
    
#    def get_time(self):
#        return self.time;

#    def set_time(self):
#        this.time = datetime.now(tz = None);
     
    def __str__(self):
        return "Id: {}, Message von Profil {} im Chat {}: {}".format(self.get_id(), self.get_profilID(), self.get_room(), self.get_text());

    #Umwandlung eines Dictonary Eintrags in ein Message Objekt
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = MessageBO()
        obj.set_id(dictionary["id"])
        obj.set_profilID(dictionary["profilID"])
        obj.set_room(dictionary["room"])
        obj.set_text(dictionary["text"])
        return obj