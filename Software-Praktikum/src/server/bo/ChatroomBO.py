from server.bo.Businessobject import Businessobject

# Bei den Chaträumen wird dabei unter Gruppenchaträume und Zweierchaträume aufgeteilt
# E: Zweierchat
# G: Gruppenchat

# @author [Ha Mi Duong](https://github.com/HamiDuong)

class ChatroomBO(Businessobject):

    def __init__(self):
        super().__init__()
        self.chattype = ""

    def set_chattype(self, value):
        self.chattype = value

    def get_chattype(self):
        return self.chattype

    def __str__(self):
        return "Raum: {}, Type: {}".format(self.get_id(), self.get_chattype())

    #Umwandlung eines Dictonary Eintrags in ein Message Objekt
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = ChatroomBO()
        obj.set_id(dictionary["id"])
        obj.set_chattype(dictionary["chattype"])
        return obj