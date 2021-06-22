from server.db.Mapper import Mapper
from server.bo.ChatroomBO import ChatroomBO


class ChatroomMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, chatroom):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM chatroom")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                chatroom.set_id(maxid[0]+1)
            else:
                chatroom.set_id(1)

        command = "INSERT INTO chatroom (id, name, chattype) VALUES (%s,%s,%s)"
        data = (
            chatroom.get_id(),
            chatroom.get_name(),
            chatroom.get_chattype()
        )

        cursor.execute(command, data)
        cursor.close()
        return chatroom

    def delete(self, room):
        cursor = self._cnx.cursor()
        command = "DELETE FROM chatroom WHERE id={}".format(room.get_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def find_all(self):
        res = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, chattype FROM chatroom")
        tuples = cursor.fetchall()

        for(id, name, chattype) in tuples:
            room = ChatroomBO()
            room.set_id(id)
            room.set_name(name)
            room.set_chattype(chattype)
            res.append(room)

        self._cnx.commit()
        cursor.close()
        return res

    def find_by_key(self, id):
        res = None
        cursor = self._cnx.cursor()
        command = "SELECT id, name, chattype FROM chatroom WHERE id={}".format(
            id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, type) = tuples[0]
            room = ChatroomBO()
            room.set_id(id)
            room.set_name(name)
            room.set_chattype(type)
            res = room
        except IndexError:
            res = None

        self._cnx.commit()
        cursor.close()
        return res

    def update(self, room):
        cursor = self._cnx.cursor()
        command = "UPDATE chatroom " + "SET name=%s, chattype=%s"
        data = (room.get_name(),
                room.get_chattype())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
