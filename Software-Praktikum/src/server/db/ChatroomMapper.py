from server.db.Mapper import Mapper
from server.bo.ChatroomBO import ChatroomBO


class ChatroomMapper(Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, room):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM chatroom")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                room.set_id(maxid[0]+1)
            else:
                room.set_id(1)

        command = "INSERT INTO chatroom (id, chattype) VALUES (%s, %s)"
        data = (
            room.get_id(),
            room.get_chattype()
        )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return room

    def latest_room(self):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM chatroom")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            for elem in maxid:
                res = elem
            
        self._cnx.commit()
        cursor.close()
        return res


    def delete(self, room):
        cursor = self._cnx.cursor()
        command = "DELETE FROM lernapp.chatroom WHERE id={}".format(room.get_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def find_all(self):
        res = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, chattype FROM lernapp.chatroom")
        tuples = cursor.fetchall()

        for(id, chattype) in tuples:
            room = ChatroomBO()
            room.set_id(id)
            room.set_chattype(chattype)
            res.append(room)
        
        self._cnx.commit()
        cursor.close()
        return res

    def find_by_key(self, id):
        res = None
        cursor = self._cnx.cursor()
        command = "SELECT id, chattype FROM lernapp.chatroom WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
        try:
            (id, chattype) = tuples[0]
            room = ChatroomBO()
            room.set_id(id)
            room.set_chattype(chattype)
            res = room
        except IndexError:
            res = None
        
        self._cnx.commit()
        cursor.close()
        return res

    def update(self, room):
        cursor = self._cnx.cursor()
        command = "UPDATE chatroom " + "SET chattype=%s"
        data = (room.get_chattype())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
