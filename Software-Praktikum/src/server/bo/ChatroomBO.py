from .Businessobject import Businessobject


class ChatroomBO (Businessobject):
    def __init__(self):
        super().__init__()
        self.name = None
        self.chattype = None

    def set_name(self, name):
        self.name = name

    def get_name(self):
        return self.name

    def set_chattype(self, type):
        self.chattype = type

    def get_chattype(self):
        return self.chattype

    def __str__(self):
        return "Raum: {}".format(self.get_id())

    # Umwandlung eines Dictonary Eintrags in ein Message Objekt
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = ChatroomBO()
        obj.set_id(dictionary["id"])
        return obj
