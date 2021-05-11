class Businesslogik (object):
    
    def __init__(self):
        pass

    def create_group(self, gruppenid,gruppenname, beschreibung, admin):
        group = Group()
        group.set_gruppenid(gruppenid)
        group.set_gruppenname(gruppenname)
        group.set_beschreibung(beschreibung)
        group.set_admin(admin)
        

        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_group_by_gruppenid(self, number):
        with GROUPMapper() as mapper:
            return mapper.find_by_key(number)

    def update_Group(self, group):
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        with GroupMapper() as mapper:
            mapper.delete(group)