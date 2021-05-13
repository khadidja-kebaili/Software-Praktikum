from .bo.MessageBO import MessageBO;
from .db.MessageMapper import MessageMapper;

from .bo.ChatroomBO import ChatroomBO;
from .db.ChatroomMapper import ChatroomMapper;

class Businesslogik(object):
    def __init__(self):
        pass;

    
    #Methoden für Message
    def create_message(self, profilID, room, text):
        message = MessageBO();
        message.set_profilID(profilID);
        message.set_room(room);
        message.set_text(text);
        #message.set_time(time);
        message.set_id(1);

        with MessageMapper() as mapper:
            return mapper.insert(message);

    def get_messages_by_roomID(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_room(id);
    
    def update_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message);

    def get_allMessages(self):
        with MessageMapper() as mapper:
            return mapper.find_all;

    #Methoden für Chatroom
    def create_chatroom(self):
        room = ChatroomBO();
        room.set_id(1);

        with ChatroomMapper() as mapper:
            return mapper.insert(room);
    
