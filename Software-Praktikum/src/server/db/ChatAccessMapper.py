from server.bo.ChatroomBO import ChatroomBO
from server.db.Mapper import Mapper;
from server.bo.ChatAccessBO import ChatAccessBO;

class ChatAccessMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, access):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM chataccess")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                access.set_id(maxid[0]+1)
            else:
                access.set_id(1)

        command = "INSERT INTO chataccess (id, profilID, room, chattype) VALUES (%s, %s, %s, %s)"
        data = (
            access.get_id(),
            access.get_profilID(),
            access.get_room(),
            access.get_chattype()
        )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return access

    def find_all(self):
        res = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, profilID, room, chattype FROM chataccess");
        tuples = cursor.fetchall()

        for(id, profilID, room, chattype) in tuples:
            access = ChatAccessBO()
            access.set_id(id)
            access.set_profilID(profilID)
            access.set_room(room)
            access.set_chattype(chattype)
            res.append(access)
        
        self._cnx.commit()
        cursor.close()
        return res

    def find_by_key(self, id):
        res = None
        cursor = self._cnx.cursor()
        command = "SELECT id, profilID, room, chattype FROM chataccess WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
        try:
            (id, profilID, room, chattype) = tuples[0]
            access = ChatAccessBO()
            access.set_id(id)
            access.set_profilID(profilID)
            access.set_room(room)
            access.set_chattype(chattype)
            res = access
        except IndexError:
            res = None
        
        self._cnx.commit()
        cursor.close()
        return res
    
    #gibt die Gruppenchaträume des gegebenen Profils zurück
    def find_groupchat_by_profil(self, profilID):
        res = []
        cursor = self._cnx.cursor()
        command = "SELECT room FROM chataccess WHERE profilID={} AND chattype='g'".format(profilID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        holder = ()
        res2 = list(holder)
        for elem in tuples:
            for i in elem:
                res2.append(i)
        holder = tuple(res2)

        command2 = "SELECT id, chattype FROM chatroom WHERE id IN {}".format(holder)
        cursor.execute(command2)
        holder = cursor.fetchall()

        for (id, chattype) in holder:
            room = ChatroomBO()
            room.set_id(id)
            room.set_chattype(chattype)
            res.append(room)

        self._cnx.commit()
        cursor.close()
        return res


    #gibt die Zweier-Chats des gegebenen Profils zurück
    def find_singlechat_by_profil(self, profilID):
        res = []
        cursor = self._cnx.cursor()
        command = "SELECT room FROM chataccess WHERE profilID={} AND chattype='e'".format(profilID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        holder = ()
        res2 = list(holder)
        for elem in tuples:
            for i in elem:
                res2.append(i)
        holder = tuple(res2)

        command2 = "SELECT id, chattype FROM chatroom WHERE id IN {}".format(holder)
        cursor.execute(command2)
        holder = cursor.fetchall()

        for (id, chattype) in holder:
            room = ChatroomBO()
            room.set_id(id)
            room.set_chattype(chattype)
            res.append(room)

        self._cnx.commit()
        cursor.close()
        return res
    #gibt die Chataccess von Gruppenmitglieder einer Gruppe zurück
    def get_groupmembers(self, room):
        res=[]
        cursor = self._cnx.cursor()
        command = "SELECT id, profilID, room, chattype FROM chataccess WHERE room={}".format(room)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, profilID, room, chattype) in tuples:
            member = ChatAccessBO()
            member.set_id(id)
            member.set_profilID(profilID)
            member.set_room(room)
            member.set_chattype(chattype)
            res.append(member)

        self._cnx.commit()
        cursor.close()
        return res

    def delete_by_room_and_profilID(self, profil, room):
        cursor = self._cnx.cursor();
        command = "DELETE FROM chataccess WHERE profilID={} AND room={}".format(profil, room)
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def delete(self, access):
        cursor = self._cnx.cursor()
        command = "DELETE FROM chataccess WHERE id={}".format(access.get_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def update(self, access):
        cursor = self._cnx.cursor()
        command = "UPDATE chataccess " + "SET profilID=%s, room=%s chattype=%s WHERE id=%s"
        data = (access.get_profilID(),
                access.get_room(),
                access.get_chattype(),
                access.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()