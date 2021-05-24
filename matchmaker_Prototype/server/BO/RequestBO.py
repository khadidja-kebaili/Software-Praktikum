from matchmaker_Prototype.server.BO.Businessobjects import BusinessObject

class Request(BusinessObject):

    def __init__(self):
        super().__init__()
        self.requested_by = ""

    def set_requested_by(self, value):
        self.requested_by = value

    def get_requested_by(self):
        return self.get_requested_by

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Request: ID: {}, Requested_by: {}".format(self.get_id(), self.get_requested_by())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Request."""
        obj = Request()
        obj.set_id(dictionary["id"])
        obj.set_requested_by(dictionary["requested_by"])
        return obj

