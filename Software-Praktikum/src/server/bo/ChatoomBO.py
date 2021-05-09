from .Businessobject import Businessobject;

class Chatroom (Businessobject):
    def __init__(self, history):
        super().__init__();
        self.history = history;

    def get_history(self):
        return this.history;
        
#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):

    obj = Chatroom(
        dictionary["id"]
        dictionary["history"]
    );
    return obj;