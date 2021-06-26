from src.server.bo.Businessobject import Businessobject

class Group(Businessobject):
    def __init__(self):
        super().__init__()

        self.description = ""
        self.groupname = "",
        self.admin = "",
        self.chatid = "",

    def set_description(self, value):
        self.description = value

    def get_description(self):
        return self.description

    def set_groupname(self, value):
        self.groupname = value

    def get_groupname(self):
        return self.groupname

    def set_admin(self, value):
        self.admin = value

    def get_admin(self):
        return self.admin

    def set_chatid(self, value):
        self.chatid = value

    def get_chatid(self):
        return self.chatid


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Info:{}, {}, {}, {}".format(self.get_description(), self.get_groupname(), self.get_admin(),
                                            self.get_chatid())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Group()
        obj.set_id(dictionary["id"])
        obj.set_description(dictionary["description"])
        obj.set_groupname(dictionary["groupname"])
        obj.set_admin(dictionary["admin"])
        obj.set_chatid(dictionary["chatid"])
        return obj
