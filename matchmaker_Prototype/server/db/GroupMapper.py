from matchmaker_Prototype.server.db.Mapper import Mapper
from matchmaker_Prototype.server.BO.GroupBO import Group

class GroupMapper(Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, group):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM test.group ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                group.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                group.set_id(1)

        command = "INSERT INTO test.group (id, groupname, admin, description) VALUES (%s, %s,%s,%s)"
        data = (
            group.get_id(), group.get_groupname(),
            group.get_admin(),
            group.get_description())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT id, groupname, admin, description FROM group")
        tuples = cursor.fetchall()

        for (id, groupname, admin, description) in tuples:
            group = Group()
            group.set_id(id)
            group.set_groupname(groupname)
            group.set_admin(admin)
            group.set_description(description)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, admin, groupname, description FROM test.group WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, admin, description, groupname) = tuples[0]
            profile = Group()
            profile.set_id(id)
            profile.set_groupname(groupname)
            profile.set_admin(admin)
            profile.set_description(description)
            result = profile
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, group):

        cursor = self._cnx.cursor()

        command = "UPDATE test.group " + "SET description=%s, admin=%s, groupname=%s WHERE id=%s"
        data = (group.get_groupname(),
        group.get_admin(),
        group.get_description(),
                group.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, group):
        cursor = self._cnx.cursor()

        command = "DELETE FROM test.group WHERE id={}".format(
            group.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update_requested_by(self, object):
        pass

if (__name__ == "__main__"):
    with GroupMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
