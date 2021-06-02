from server.db.GroupMapper import GroupMapper


class Businesslogik (object):
    
    def __init__(self):
        pass

    def create_group(self, group):
               

        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_group_by_gruppenid(self, number):
        with GroupMapper() as mapper:
            return mapper.find_by_key(number)

    def update_Group(self, group):
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        with GroupMapper() as mapper:
            mapper.delete(group)