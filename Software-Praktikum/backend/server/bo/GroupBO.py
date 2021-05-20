# gruppen editieren/ löschen 
#get und set, init :gruppenid, name, mitglieder, lernbereich, admin
#gruppe eigenschaft admin=none

from .Businessobject import BusinessObject

class Group (BusinessObject):
    def __init__(self):
        super().__init__()
    
        self.groupname= "",
        self.description= "",
        self.admin= ""

        self.memberlist=[]

   # def set_id(self, value):
      #  self.id = value

  #  def get_id(self):
       # return self.id

    def set_groupname(self, value):
        self.groupname = value

    def get_groupname(self):
        return self.groupname

    def set_description(self, value):
        self.description = value

    def get_description(self):
        return self.description

    def set_admin(self, value):
        self.admin = value

    def get_admin(self):
        return self.admin   

    def __str__(self):
            """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
            return "Info:{}, {}, {},".format(self.get_groupname(), self.get_description(), self.get_admin())

    @staticmethod
    def from_dict(dictionary=dict()):
            """Umwandeln eines Python dict() in einen User()."""
            obj = Group()
            obj.set_groupname(dictionary["groupname"])
            obj.set_description(dictionary["description"])
            obj.set_admin(dictionary["admin"])
            return obj

        
  











