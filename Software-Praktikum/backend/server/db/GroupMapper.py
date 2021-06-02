from server.db.Mapper import Mapper
from server.bo.GroupBO import GroupBO



class GroupMapper(Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, group):

        cursor = self._cnx.cursor()
        

        command = "INSERT INTO test.group (admin, description, groupname) VALUES (%s,%s,%s)"
        data = (
            group.get_admin(),
            group.get_description(), 
            group.get_groupname())
        cursor.execute(command, data)

        for member in group.get_memberlist():
            command = "INSERT into test.groupmember (groupid, profilid) VALUES (%s, %s )" 
            data = (group.get_id(),member)
            cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return group

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT id, admin, description, groupname FROM test.group")
        tuples = cursor.fetchall()

        for (id, admin, description, groupname) in tuples:
            group = GroupBO()
            group.set_id(id)
            group.set_admin(admin)
            group.set_description(description)
            group.set_groupname(groupname)
            
            cursor.execute(
                "SELECT  profilid FROM test.groupmember WHERE groupid= %s",(id,))
            tuples2 = cursor.fetchall()
            for profilid in tuples2:
                group.add_member(profilid)   # die methode aus GroupBO

            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, admin, description,groupname FROM test.group WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, admin, description,groupname) = tuples[0]
            group = GroupBO()
            group.set_id(id)
            group.set_admin(admin)
            group.set_description(description)
            group.set_groupname(groupname)
            cursor.execute(
                "SELECT  profilid FROM test.groupmember WHERE groupid= %s",(id,))
            tuples2 = cursor.fetchall()
            for profilid in tuples2:
                group.add_member(profilid)

            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, group):

        cursor = self._cnx.cursor()

        command = "UPDATE test.group " + "SET admin=%s, groupname=%s, description=%s WHERE id=%s"
        data = (
            group.get_admin(),
            group.get_groupname(),
            group.get_description(),
            group.get_id(),
            )
        cursor.execute(command, data)
        # user werden gelöscht
        command = "DELETE from test.groupmember WHERE groupid=%s "  
        data = (group.get_id(),)
        cursor.execute(command, data)

        # user werden eingefügt mit der for schleife
        for member in group.get_memberlist():
            command = "INSERT into test.groupmember (groupid, profilid) VALUES (%s, %s )" 
            data = (group.get_id(),member)
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, group):
        cursor = self._cnx.cursor()

        command = "DELETE FROM test.group WHERE id={}".format(
            group.get_id())
        cursor.execute(command)

        command = "DELETE from test.groupmember WHERE groupid=%s "  
        data = (group.get_id(),)
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

    def update_requested_by(self, object):
        pass                                 

if(__name__=="__main__"):
    print("test")
    with GroupMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)