from server.bo.ChatAccessBO import ChatAccessBO
from server.db.ChatAccessMapper import ChatAccessMapper
from server.bo.MessageBO import MessageBO;
from server.db.MessageMapper import MessageMapper;

from server.bo.ChatroomBO import ChatroomBO;
from server.db.ChatroomMapper import ChatroomMapper;

class Businesslogic(object):
    def __init__(self):
        pass;

    
    #Methoden für Message
    def create_message(self, profilID, room, text):
        message = MessageBO();
        message.set_profilID(profilID);
        message.set_room(room);
        message.set_text(text);
        message.set_id(1);

        with MessageMapper() as mapper:
            return mapper.insert(message);

    def get_message_by_id(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_key(id);

    def get_messages_by_roomID(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_room(id);
    
    def update_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message);

    def get_allMessages(self):
        with MessageMapper() as mapper:
            return mapper.find_all();
    
    #def get_room_by_user(self, id):
    #    with MessageMapper() as mapper:
    #        return mapper.find_associatedRooms(id);

    def delete_message(self, id):
        with MessageMapper() as mapper:
            return mapper.delete(id);

    #Methoden für Chatroom
    def create_chatroom(self, name, type):
        room = ChatroomBO();
        room.set_id(1);
        room.set_name(name);
        room.set_chattype(type);

        with ChatroomMapper() as mapper:
            return mapper.insert(room);

    def get_allRooms(self):
        with ChatroomMapper() as mapper:
            return mapper.find_all();

    def get_room_by_id(self, id):
        with ChatroomMapper() as mapper:
            return mapper.find_by_key(id);
        
    def delete_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.delete(room);

    def update_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.update(room);

    #Methoden für ChatAccess
    def create_chataccess(self, profilID, room, chattype):
        access = ChatAccessBO();
        access.set_id(1);
        access.profilID = profilID;
        access.room = room;
        access.chattype = chattype;

        with ChatAccessMapper() as mapper:
            return mapper.insert(access);

    def get_allChataccess(self):
        with ChatAccessMapper() as mapper:
            return mapper.find_all;

    def get_Chataccess_by_id(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.find_by_key(id);

    def get_groupchataccess_by_profil(self, profil):
        with ChatAccessMapper() as mapper:
            return mapper.find_groupchat_by_profil(profil);
        
    def get_singlechataccess_by_profil(self, profil):
        with ChatAccessMapper() as mapper:
            return mapper.find_singlechat_by_profil(profil);

    def get_profils_by_room(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.get_groupmembers(id);

    def delete_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.delete(access);

    def update_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.update(access)

# l = Businesslogic()
# print(l.get_profils_by_room(1))
