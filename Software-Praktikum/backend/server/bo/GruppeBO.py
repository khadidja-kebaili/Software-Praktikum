# gruppen editieren/ löschen 
#get und set, init :gruppenid, name, mitglieder, lernbereich, admin
#gruppe eigenschaft admin=none

from .Businessobject import BusinessObject

class Group (BusinessObject):
    def __init__(self):
        super().__init__()
        self.gruppenid= "",
        self.gruppenname= "",
        self.beschreibung= "",
        self.admin= ""

        self.mitgliederliste=[]

def set_gruppenid(self, value):
    self.gruppenid = value

def get_gruppenid(self):
    return self.gruppenid

def set_gruppenname(self, value):
    self.gruppenname = value

def get_gruppenname(self):
    return self.gruppenname

def set_beschreibung(self, value):
    self.beschreibung = value

def get_beschreibung(self):
    return self.beschreibung

def set_admin(self, value):
    self.admin = value

def get_admin(self):
    return self.admin   

 def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Info: {}, {}, {}, {},".format(self.get_gruppenid(), self.get_gruppenname(), self.get_beschreibung(), self.get_admin())

 @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Group()
        obj.set_gruppenid(dictionary["gruppenid"])
        obj.set_gruppenname(dictionary["gruppenname"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_admin(dictionary["admin"])
        return obj
  
















