from .bo.ProfileBO import Studentprofile
from .bo.UserBO import User
# from .bo.GroupBO import Group
from .db.Profilemapper import StudentprofileMapper
from .db.UserMapper import UserMapper
# from .db.GroupMapper import GroupMapper
# # chat
from .bo.ChatAccessBO import ChatAccessBO
from .db.ChatAccessMapper import ChatAccessMapper
from .bo.MessageBO import MessageBO
from .db.MessageMapper import MessageMapper

from server.bo.ChatroomBO import ChatroomBO
from server.db.ChatroomMapper import ChatroomMapper


class Businesslogic (object):

    def __init__(self):
        pass

    def create_user(self, name, user_id, email):
        user = User()
        user.set_name(name)
        user.set_user_id(user_id)
        user.set_email(email)
        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_google_user_id(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def create_profile(self, first_name, last_name, age, semester, major, hobbys, interests,
                       personality, learnstyle, studytime, studyplace, studyfrequence, workexperience):
        studentprofile = Studentprofile()
        studentprofile.set_first_name(first_name)
        studentprofile.set_last_name(last_name)
        studentprofile.set_age(age)
        studentprofile.set_semester(semester)
        studentprofile.set_major(major)
        studentprofile.set_hobbys(hobbys)
        studentprofile.set_interests(interests)
        studentprofile.set_personality(personality)
        studentprofile.set_learnstyle(learnstyle)
        studentprofile.set_studytime(studytime)
        studentprofile.set_studyplace(studyplace),
        studentprofile.set_studyfrequence(studyfrequence)
        studentprofile.set_workexperience(workexperience)

        with StudentprofileMapper() as mapper:
            return mapper.insert(studentprofile)

    def get_profile_by_id(self, number):

        with StudentprofileMapper() as mapper:
            return mapper.find_by_key(number)

    def get_all_profiles(self):
        with StudentprofileMapper() as mapper:
            return mapper.find_all()

    def save_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.update(studentprofile)

    def delete_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.delete(studentprofile)

    # def get_all_groups(self):
    #     with GroupMapper() as mapper:
    #         return mapper.find_all()

    # def get_group_by_id(self, number):
    #     with GroupMapper() as mapper:
    #         return mapper.find_by_key(number)

    # def get_group_of_profile(self, profile):
    #     with GroupMapper() as mapper:
    #         return mapper.find_by_owner_id(profile.get_id())

    # def delete_group(self, group):
    #     with GroupMapper() as mapper:
    #         mapper.delete(group)

    # def create_group_for_profile(self, profile):
    #     with GroupMapper() as mapper:
    #         if profile is not None:
    #             group = Group()
    #             group.set_owner(group.get_id())
    #             group.set_id(1)

    #             return mapper.insert(group)
    #         else:
    #             return None

    def get_members(self):
        members = [
            {
                "first_name": "Thomas",
                "last_name": "Müller",
                "id": 2
            },
            {
                "first_name": "Khadidja",
                "last_name": "Kebaili",
                "id": 3

            },
            {
                "first_name": "Esra",
                "last_name": "Copuro",
                "id": 1

            },
            {
                "first_name": "Hami",
                "last_name": "Duong",
                "id": 4

            }]
        return members

    def get_profile_by_name(self, last_name):
        with StudentprofileMapper() as mapper:
            return mapper.find_by_last_name(last_name)

# Methoden für Message
    def create_message(self, profilID, room, text):
        message = MessageBO()
        message.set_profilID(profilID)
        message.set_room(room)
        message.set_text(text)
        message.set_id(1)

        with MessageMapper() as mapper:
            return mapper.insert(message)

    def get_message_by_id(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_key(id)

    def get_messages_by_roomID(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_room(id)

    def update_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message)

    def get_allMessages(self):
        with MessageMapper() as mapper:
            return mapper.find_all()

    # def get_room_by_user(self, id):
    #    with MessageMapper() as mapper:
    #        return mapper.find_associatedRooms(id);

    def delete_message(self, id):
        with MessageMapper() as mapper:
            return mapper.delete(id)

    # Methoden für Chatroom
    def create_chatroom(self, name, type):
        room = ChatroomBO()
        room.set_id(1)
        room.set_name(name)
        room.set_chattype(type)

        with ChatroomMapper() as mapper:
            return mapper.insert(room)

    def get_allRooms(self):
        with ChatroomMapper() as mapper:
            return mapper.find_all()

    def get_room_by_id(self, id):
        with ChatroomMapper() as mapper:
            return mapper.find_by_key(id)

    def delete_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.delete(room)

    def update_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.update(room)

    # Methoden für ChatAccess
    def create_chataccess(self, profilID, room, chattype):
        access = ChatAccessBO()
        access.set_id(1)
        access.profilID = profilID
        access.room = room
        access.chattype = chattype

        with ChatAccessMapper() as mapper:
            return mapper.insert(access)

    def get_allChataccess(self):
        with ChatAccessMapper() as mapper:
            return mapper.find_all()

    def get_Chataccess_by_id(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.find_by_key(id)

    def get_groupchataccess_by_profil(self, profil):
        with ChatAccessMapper() as mapper:
            return mapper.find_groupchat_by_profil(profil)

    def get_singlechataccess_by_profil(self, profil):
        with ChatAccessMapper() as mapper:
            return mapper.find_singlechat_by_profil(profil)

    def get_profils_by_room(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.get_groupmembers(id)

    def delete_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.delete(access)

    def update_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.update(access)
