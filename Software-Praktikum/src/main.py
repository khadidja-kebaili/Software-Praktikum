from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from server.Businesslogic import Businesslogic
from server.bo.MessageBO import MessageBO
from server.bo.ChatroomBO import ChatroomBO
from server.bo.ChatAccessBO import ChatAccessBO
from server.bo.ProfileBO import Studentprofile
from server.bo.RequestBO import Request
from server.bo.GroupBO import Group
from server.bo.UserBO import User
from server.db.UserMapper import UserMapper
from SecurityDecorator import secured


app = Flask(__name__)
CORS(app)
api = Api(app)

api = api.namespace('api', description='Funktionen der Lernapp')

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='name', description='Name eines Benutzers'),
    'email': fields.String(attribute='email', description='E-Mail-Adresse eines Benutzers'),
    'user_id': fields.String(attribute='user_id', description='Google User ID eines Benutzers')
})
profile = api.inherit('Profile', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name'),
    'age': fields.Integer(attribute='age', description='age'),
    'semester': fields.Integer(attribute='semester', description='semester'),
    'major': fields.String(attribute='major', description='major'),
    'hobbies': fields.String(attribute='hobbies', description='hobbys'),
    'interests': fields.String(attribute='interests', description='interests'),
    'personality': fields.String(attribute='personality', description='personality'),
    'learn_style': fields.String(attribute='learn_style', description='learn_style'),
    'study_time': fields.String(attribute='study_time', description='study_time'),
    'study_place': fields.String(attribute='study_place', description='study_place'),
    'study_frequence': fields.Integer(attribute='study_frequence', description='study_frequence'),
    'work_experience': fields.String(attribute='work_experience', description='work_experience'),
})

group = api.inherit('Group', bo, {
    'groupname': fields.String(attribute='groupname', description='groupname'),
    'admin': fields.Integer(attribute='admin', description='admin'),
    'description': fields.String(attribute='description', description='description'),
    'chatid': fields.Integer(attribute='chatid', description='description')
})

member = api.inherit('Member', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name')
})

message = api.inherit('Message', bo, {
    'profile_id': fields.Integer(attribute='profile_id', description='ID des Senders'),
    'room': fields.Integer(attribute='room', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text')
})

chatroom = api.inherit('Chatroom', bo, {
    'chattype': fields.String(attribute='chattype', description='Art des Chatraums (e-Einzel, g-Gruppe)')
})

chataccess = api.inherit('Chataccess', bo, {
    'profile_id': fields.Integer(attribute='profile_id', description='ID des Profils'),
    'room': fields.Integer(attribute='room', description='ID des Raums'),
    'chattype': fields.String(attribute='chattype', description='Art des Chatraums (e-Einzel, g-Gruppe)')
})

matchmaker_profile = api.inherit('Profil', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name'),
    'semester': fields.Integer(attribute='semester', description='semester'),
    'major': fields.String(attribute='major', description='major'),
    'personality': fields.String(attribute='personality', description='personality'),
    'learnstyle': fields.String(attribute='learnstyle', description='learnstyle'),
    'studytime': fields.String(attribute='studytime', description='studytime'),
    'studyplace': fields.String(attribute='studyplace', description='studyplace'),
    'studyfrequence': fields.Integer(attribute='studyfrequence', description='studyfrequence'),
    'workexperience': fields.String(attribute='workexperience', description='workexperience'),
})

request = api.inherit('Request', bo, {
    'requested': fields.Integer(attribute='requested', description='requested'),
    'requested_by': fields.Integer(attribute='requested_by', description='requested_by'),
    'request_type': fields.String(attribute='request_type', description='request_type'),
    'group_id': fields.Integer(attribute='group_id', description='group_id')
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='name', description='Name eines Benutzers'),
    'email': fields.String(attribute='email', description='E-Mail-Adresse eines Benutzers'),
    'google_user_id': fields.String(attribute='user_id', description='Google User ID eines Benutzers')
})

# User
@api.route('/user')
class UserOperations(Resource):
    @api.marshal_with(user)
    @secured
    def get(self):
        """Auslesen aller User Objekte"""
        adm = Businesslogic()
        users = adm.get_all_users()
        return users

@api.route('/user/<string:id>')
@api.param('id', 'Id des Users')
class UserOperations(Resource):
    @api.marshal_with(user)
    @secured
    def get(self, id):
        """Auslesen aller User Objekte"""
        adm = Businesslogic()
        user = adm.get_user_by_google_user_id(id)
        return user


# Message


@api.route('/message')
class MessageOperations(Resource):
    @api.marshal_with(message)
    @api.expect(message)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = MessageBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_message(
                proposal.get_profile_id(),
                proposal.get_room(),
                proposal.get_text()
            )
            return p

    @api.marshal_list_with(message)
    @secured
    def get(self):
        adm = Businesslogic()
        msg = adm.get_all_messages()
        return msg


@api.route('/message/<int:id>')
@api.param('id', 'Die ID der Nachricht')
class MessageWithIDOperations(Resource):
    @api.marshal_with(message)
    @secured
    def get(self, id):
        adm = Businesslogic()
        msg = adm.get_message_by_id(id)
        return msg

    @api.marshal_with(message)
    @secured
    def delete(self, id):
        adm = Businesslogic()
        msgs = adm.get_message_by_id(id)
        adm.delete_message(msgs)
        return ''

    @api.marshal_with(message)
    @api.expect(message, validate=True)
    @secured
    def put(self, id):
        adm = Businesslogic()
        p = MessageBO.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_message(p)
            return p, 200
        else:
            return '', 500


@api.route('/chatroom_message/<int:room>')
@api.param('room', 'Die Id des Chatraums')
class FindMessagesByRoom(Resource):
    @api.marshal_with(message)
    @secured
    def get(self, room):
        adm = Businesslogic()
        messages = adm.get_messages_by_room_id(room)
        return messages


# Chatroom
@api.route('/chatroom')
class ChatroomOperations(Resource):
    @api.marshal_with(chatroom)
    @api.expect(chatroom)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = ChatroomBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chatroom(
                proposal.get_chattype()
            )
            return p

    @api.marshal_list_with(chatroom)
    @secured
    def get(self):
        adm = Businesslogic()
        room = adm.get_all_rooms()
        return room


@api.route('/chatroom/<int:id>')
@api.param('id', 'Die ID des Chatraums')
class ChatroomWithIDOperations(Resource):
    @api.marshal_with(chatroom)
    @secured
    def get(self, id):
        adm = Businesslogic()
        room = adm.get_room_by_id(id)
        return room

    @api.marshal_with(chatroom)
    @secured
    def delete(self, id):
        adm = Businesslogic()
        room = adm.get_room_by_id(id)
        adm.delete_chatroom(room)
        return ''

    @api.marshal_with(chatroom)
    @api.expect(chatroom, validate=True)
    @secured
    def put(self, id):
        adm = Businesslogic()
        p = ChatroomBO.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_message(p)
            return p, 200
        else:
            return '', 500

@api.route('/singlechatroom/')
class LatestChatroom(Resource):
    @api.marshal_with(chatroom)
    def get(self):
        adm = Businesslogic()
        room = adm.latest_room()
        return room

# @api.route('/singlechatroom/<int:id>/user_two/<int:id>')
# @api.param('id', 'ID des Profils', 'id - ID des Profils' )
# class ChatroomAfterRequest(Resource):
#     @api.marshal_with(chataccess)
#     @secured
#     def post(self):
#         adm = Businesslogic()
#         proposal = ChatAccessBO.from_dict(api.payload)
#         if proposal is not None:
#             p = adm.create_chataccess()

# Chataccess
@api.route('/chataccess')
class ChataccessOperations(Resource):
    @api.marshal_with(chataccess)
    @api.expect(chataccess)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = ChatAccessBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chataccess(
                proposal.get_profile_id(),
                proposal.get_room(),
                proposal.get_chattype()
            )
            return p

    @api.marshal_with(chataccess)
    @secured
    def get(self):
        adm = Businesslogic()
        access = adm.get_all_chataccess()
        return access


@api.route('/chataccess/<int:id>')
@api.param('id', 'Die ID des Chataccess')
class ChataccessWithIDOperations(Resource):
    @api.marshal_with(chataccess)
    @secured
    def get(self, id):
        adm = Businesslogic()
        access = adm.get_chataccess_by_id(id)
        return access

    @api.marshal_with(chataccess)
    @secured
    def delete(self, id):
        adm = Businesslogic()
        adm.delete_chataccess(id)
        return ''

    @api.marshal_with(chataccess)
    @api.expect(chatroom, validate=True)
    @secured
    def put(self, id):
        adm = Businesslogic()
        p = ChatAccessBO.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_chataccess(p)
            return p, 200
        else:
            return '', 500


# Mitglieder anzeigen
@api.route('/chataccess_member/<int:room>')
@api.param('room', 'Id des Chatraums')
class FindMembers(Resource):
    @api.marshal_with(member)
    @secured
    def get(self, room):
        adm = Businesslogic()
        profiles = adm.get_profiles_by_room(room)
        return profiles

# Mitglieder hinzuf??gen


@api.route('/chataccess_new_member')
class ChataccessNewMembers (Resource):
    @api.marshal_with(chataccess)
    @api.expect(chataccess)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = ChatAccessBO.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_chataccess_new_member(
                proposal.get_profile_id(),
                proposal.get_room(),
                proposal.get_chattype()
            )
            return p


@api.route('/chataccess_groupchat/<int:profile_id>')
@api.param('profile_id', 'Id des Profils')
class FindGroupchats(Resource):
    @api.marshal_with(chatroom)
    @secured
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_groupchats_by_profile(profile_id)
        return rooms


@api.route('/chataccess_singlechat/<int:profile_id>')
@api.param('profile_id', 'Id des Profils')
class FindSinglechats(Resource):
    @api.marshal_with(chatroom)
    @secured
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_singlechats_by_profile(profile_id)
        return rooms


@api.route('/chataccess_chats/<int:profile_id>')
@api.param('profile_id', 'Id des Profils')
class FindChatsByProfile(Resource):
    @api.marshal_with(chatroom)
    @secured
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_chatroom_by_profile(profile_id)
        return rooms


@api.route('/chataccess_partner/<int:room>/profile/<int:profile_id>')
@api.param('room', 'ID des Raums', 'profile_id - ID des Profils')
class GetChatpartner(Resource):
    @api.marshal_with(profile)
    @secured
    def get(self, room, profile_id):
        adm = Businesslogic()
        partner = adm.get_second_profile(room, profile_id)
        return partner


@api.route('/chataccess_delete/<int:profile_id>/room/<int:room>')
@api.param('profile_id', 'ID des Profils', 'room - ID des Raums')
class DeleteTargetedChataccess(Resource):
    @api.marshal_with(chataccess)
    @secured
    def delete(self, profile_id, room):
        adm = Businesslogic()
        # access = [adm.get_chatacces_by_profile(profile_id)]
        # for elem in access:
        #     for i in elem:
        #         if i.room == room:
        #             adm.delete_chataccess(i)
        adm.delete_chatacces_by_profil_room(profile_id, room)
        return ''


# Profile
@ api.route('/profile')
class ProfilOperations(Resource):
    @ api.marshal_with(profile)
    @ api.expect(profile)
    @secured
    def post(self):
        """Anlegen eines neuen Profil-Objekts"""
        adm = Businesslogic()
        proposal = Studentprofile.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_profile(
                proposal.get_first_name(),
                proposal.get_last_name(), proposal.get_age(),
                proposal.get_semester(), proposal.get_major(),
                proposal.get_hobbys(), proposal.get_interests(),
                proposal.get_personality(), proposal.get_learnstyle(),
                proposal.get_studytime(), proposal.get_studyplace(),
                proposal.get_studyfrequence(),
                proposal.get_workexperience()
            )
            return p

    @api.marshal_list_with(profile)
    @secured
    def get(self):
        """Auslesen aller Profil Objekte"""
        adm = Businesslogic()
        profile = adm.get_all_profiles()
        return profile


@api.route('/profile/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Profilanzeigen (Resource):
    @api.marshal_with(profile)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Profil-Objekts"""
        adm = Businesslogic()
        userprofile = adm.get_profile_by_id(id)
        return userprofile

    @api.marshal_with(profile)
    @secured
    def delete(self, id):
        """L??schen eines bestimmten Profil-Objekts"""
        adm = Businesslogic()
        userprofile = adm.get_profile_by_id(id)
        adm.delete_profile(userprofile)
        user = adm.get_user_by_id(id)
        adm.delete_user(user)
        return ''

    @api.marshal_with(profile)
    @api.expect(profile, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Profil-Objekts"""
        adm = Businesslogic()
        p = Studentprofile.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_profile(p)
            return p, 200
        else:
            return '', 500


@api.route('/profiles-by-name/<string:lastname>')
@api.param('lastname', 'Der Nachname des Kunden')
class ProfilesByNameOperations(Resource):
    @api.marshal_with(member)
    @secured
    def get(self, lastname):
        """Auslesen von Profil-Objekten, die durch den Nachnamen bestimmt werden"""
        adm = Businesslogic()
        profile = adm.get_profile_by_name(lastname)
        return profile

# Group


@api.route('/group')
class GroupOperations(Resource):
    @api.marshal_with(group)
    @api.expect(group)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = Group.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_group(
                proposal.get_groupname(),
                proposal.get_admin(),
                proposal.get_description(),
            )
            return p

    @api.marshal_with(group)
    @secured
    def get(self):
        adm = Businesslogic()
        groups = adm.get_all_groups()
        return groups


@api.route('/group/<int:id>')
@api.param('id', 'Die ID des Gruppen-Objekts')
class Gruppeanzeigen (Resource):
    @api.marshal_with(group)
    @secured
    def get(self, id):
        adm = Businesslogic()
        group = adm.get_group_by_id(id)
        return group

    @api.marshal_with(group)
    @api.expect(group, validate=True)
    @secured
    def put(self, id):
        adm = Businesslogic()
        g = Group.from_dict(api.payload)

        if g is not None:
            g.set_id(id)
            adm.save_group(g)
            return g, 200
        else:
            return '', 500


@api.route('/groups_of_profile/<int:id>')
@api.param('ID eingeben f??r Profil')
class GroupsforProfile(Resource):
    @api.marshal_with(group)
    @secured
    def get(self, id):
        adm = Businesslogic()
        return adm.get_group_by_profileid(id)


# Member
@api.route('/member')
class MemberOperations(Resource):
    @api.marshal_list_with(member)
    @secured
    def get(self):
        adm = Businesslogic()
        members = adm.get_members()
        return members


@api.route('/profiles-by-name/<string:lastname>')
@api.param('lastname', 'Der Nachname des Kunden')
class ProfilesByNameOperations(Resource):
    @api.marshal_with(member)
    @secured
    def get(self, lastname):
        adm = Businesslogic()
        profile = adm.get_profile_by_name(lastname)
        return profile


# Request
@api.route('/requests')
class RequestOperations(Resource):
    @api.marshal_with(request)
    @api.expect(request)
    @secured
    def post(self):
        adm = Businesslogic()
        proposal = Request.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_request(
                proposal.get_requested(),
                proposal.get_requested_by(),
                proposal.get_request_type(),
                proposal.get_group_id()
            )
            return p

    @api.marshal_list_with(request)
    @secured
    def get(self):
        adm = Businesslogic()
        requests = adm.get_all_requests()
        return requests


@api.route('/profile_of_request/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class ProfileofRequestanzeigen (Resource):
    @api.marshal_with(matchmaker_profile)
    @secured
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_profiles_of_request(id)
        return request


@api.route('/request_for_profile/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class RequestofProfile(Resource):
    @api.marshal_with(request)
    @secured
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_of_profile(id)
        return request


@api.route('/request_for_groups/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class RequestofGroup(Resource):
    @api.marshal_with(request)
    @secured
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_of_groups(id)
        return request


@api.route('/request/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Requestanzeigen(Resource):
    @api.marshal_with(request)
    @secured
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        return request

    @api.marshal_with(request)
    @secured
    def delete(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        adm.delete_request(request)


@api.route('/delete_profile_request/<int:id1>/requested_by/<int:id2>')
@api.param('id1', 'id des requested', 'id2 - id des requested_by')
class ProfileRequestDelete(Resource):
    @api.marshal_with(request)
    @secured
    def delete(self, id1, id2):
        adm = Businesslogic()
        requests = adm.get_all_requests()
        for element in requests:
            if element.get_request_type() == "E":
                adm.delete_request_by_ids(id1, id2)


@api.route('/delete_group_request/<int:id1>/requested_by/<int:id2>')
@api.param('id1', 'id des requested', 'id2 - id des requested_by')
class GroupRequestDelete(Resource):
    @api.marshal_with(request)
    @secured
    def delete(self, id1, id2):
        adm = Businesslogic()
        requests = adm.get_request_of_profile(id1)
        for element in requests:
            if element.requested_by == id2 and element.request_type() == 'G':
                adm.delete_request(element)


@api.route('/matches/<int:id>')
class Matcher(Resource):
    @api.marshal_with(matchmaker_profile)
    @secured
    def get(self, id):
        adm = Businesslogic()
        matches = adm.set_matching_list(id)
        return matches

    @api.marshal_with(request)
    @secured
    def delete(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        adm.delete_request(request)
        return ''


if __name__ == '__main__':
    app.run(debug=True)
