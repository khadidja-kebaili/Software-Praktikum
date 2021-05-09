from .Businessobject import Businessobject;

class Message (Businessobject):
    #Instanziierung des Objekts der Klasse Message
    def __init__(self, senderID, room, text, roomCounter):
        super().__init__()
        self.senderID = senderID;
        self.room = room;
        self.text = text;
        self.roomCounter = roomCounter;

    def get_senderID(self):
        return this.senderID;

    def get_room(self):
        return this.room;

    def get_text(self):
        return this.text;
    
    def get_roomCounter(self):
        return this.roomCounter;
     
#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):

 alte Version
    obj = Message(
        dictionary["id"],
        dictionary["senderID"],
        dictionary["room"],
        dictionary["text"],
        dictionary["roomCounter"]
    );
    return obj;