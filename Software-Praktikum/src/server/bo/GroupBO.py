# from .Businessobject import Businessobject


# class Group (Businessobject):

#     def __init__(self):
#         super().__init__()
#         self.group_name = "",
#         self.description = "",
#         self.admin = None,

#     def set_group_name(self, value):
#         self.group_name = value

#     def get_group_name(self):
#         return self.group_name

#     def set_description(self, value):
#         self.description = value

#     def get_description(self):
#         return self.description

#     def set_admin(self, value):
#         self.admin = value

#     def get_admin(self):
#         return self.admin

#     def __str__(self):
#         """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
#         return "Group: {}, {}, {}".format(self.get_group_name(), self.get_description(), self.admin)

#     @staticmethod
#     def from_dict(dictionary=dict()):
#         """Umwandeln eines Python dict() in einen User()."""
#         obj = Group()
#         obj.set_id(dictionary["id"])
#         obj.set_group_name(dictionary["group_name"])
#         obj.set_description(dictionary["description"])
#         obj.set_admin(dictionary["admin"])
#         return obj
