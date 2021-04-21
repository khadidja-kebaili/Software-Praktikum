from server.bo.NamedBusinessObject import NamedBusinessObject


class Gruppe(NamedBusinessObject):
    """Realisierung einer Gruppe
    Eine Gruppe vererbt von NBO (NamedBusinessObjekt). 
    Eine Gruppe hat keine weiteren Attribute
    """
    def __init__(self):
        super().__init__()

    def __str__(self, ):
        pass

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Gruppe()"""
        obj = Gruppe()
        obj.set_id(dictionary["id"]) # from BO
        obj.set_name(dictionary["name"]) # from NBO
        return obj