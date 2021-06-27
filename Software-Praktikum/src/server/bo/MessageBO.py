from .Businessobject import Businessobject;


class MessageBO (Businessobject):
    # Instanziierung des Objekts der Klasse Message
    def __init__(self):
        super().__init__()
        self.profile_id = None
        self.room = None
        self.text = None
#        self.time = None;

    def set_profile_id(self, key):
        self.profile_id = key

    def get_profile_id(self):
        return self.profile_id

    def set_room(self, room):
        self.room = room

    def get_room(self):
        return self.room

    def set_text(self, text):
        self.text = text

    def get_text(self):
        return self.text

#    def get_time(self):
#        return self.time;

#    def set_time(self):
#        this.time = datetime.now(tz = None);
     
    def __str__(self):
        return "Id: {}, Message von Profil {} im Chat {}: {}".format(self.get_id(), self.get_profile_id(),
                                                                     self.get_room(), self.get_text())

    # Umwandlung eines Dictonary Eintrags in ein Message Objekt
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = MessageBO()
        obj.set_id(dictionary["id"])
        obj.set_profile_id(dictionary["profile_id"])
        obj.set_room(dictionary["room"])
        obj.set_text(dictionary["text"])
        return obj
