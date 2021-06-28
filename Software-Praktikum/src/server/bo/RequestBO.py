from server.bo.Businessobject import Businessobject

class Request(Businessobject):

    def __init__(self):
        super().__init__()
        self.requested_by = "",
        self.requested = "",
        self.request_date = "",
        self.request_type = ""

    def set_request_type(self, value):
        self.request_type = value

    def get_request_type(self):
        return self.request_type

    def set_request_date(self, value):
        self.request_date = value

    def get_request_date(self):
        return self.request_date

    def set_requested(self, value):
        self.requested = value

    def get_requested(self):
        return self.requested

    def set_requested_by(self, value):
        self.requested_by = value

    def get_requested_by(self):
        return self.requested_by

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Request: ID: {}, Requested_by: {}, Requested: {}, Date of request: {}, Requesttype : {}".\
            format(self.get_id(),
                   self.get_requested_by(),
                   self.get_requested(),
                   self.get_request_date(),
                   self.get_request_type())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Request."""
        obj = Request()
        obj.set_id(dictionary['id'])
        obj.set_requested_by(dictionary['requested_by'])
        obj.set_requested(dictionary['requested'])
        obj.set_request_date(dictionary['requested_date'])
        obj.set_request_type(dictionary['request_type'])
        return obj

