from matchmaker_Prototype.server.BO.Businessobjects import BusinessObject

class Group(BusinessObject):
    def __init__(self):
        super().__init__()
        self.groupname = "", 
        self.admin = "", 
        self.description = ""

    def set_description(self,value):
        self.description = value
        
    def get_description(self):
        return self.description

    def set_admin(self, value):
        self.admin = value

    def get_admin(self):
        return self.admin

    def set_groupname(self,value):
        self.groupname = value

    def get_groupname(self):
        return self.groupname

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Group: ID: {}, Name: {}, Admin: {}".format(self.get_id(), self.get_admin(), self.get_description(), self.get_groupname())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Group()
        obj.set_id(dictionary["id"])
        obj.set_admin(dictionary["admin"])
        obj.set_groupname(dictionary["groupname"])
        obj.set_description(dictionary["description"])
        return obj