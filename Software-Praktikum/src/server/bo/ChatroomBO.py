from .Businessobject import Businessobject;

class ChatroomBO (Businessobject):
    def __init__(self):
        super().__init__();

    def __str__(self):
        return "Raum: {}".format(self.get_id())

#Umwandlung eines Dictonary Eintrags in ein Message Objekt
@staticmethod
def from_dict(dictionary=dict()):
    obj = ChatroomBO();
    obj.set_id(dictionary["id"]);
    return obj;