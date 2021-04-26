from .Businessobject import Businessobject;

class Message (Businessobject):
    #Instanziierung des Objekts der Klasse Message
    def __init__(self, senderID, raum, text):
        super().__init__()
        self.senderID = senderID;
        self.raum = raum;
        self.text = text;

    def get_senderID(self):
        return this.senderID;

    def get_raum(self):
        return this.raum;

    def get_text(self):
        return this.text;
        
#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):
    obj = Message(
        dictionary["id"],
        dictionary["senderID"],
        dictionary["raum"],
        dictionary["text"]
    );
    return obj;