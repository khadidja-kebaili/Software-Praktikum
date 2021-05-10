from .Businessobject import Businessobject;

class ChatroomBO (Businessobject):
    def __init__(self):
        super().__init__();
        self.history = "";

    def get_history(self):
        return this.history;

    def set_history(self, value):
        this.history = value;

    def __str__(self):
        return "Chat: {}".format(self.get_history())       
#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):
    obj = Chatroom();
    obj.set_id(dictionary["id"]);
    obj.set_history(dictionary["history"]);
    return obj;