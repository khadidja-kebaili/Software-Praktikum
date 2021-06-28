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

# from SecurityDecorator import secured
# from SecurityDecorator import secured

app = Flask(__name__)
CORS(app, resources=r'/*')
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
})
profile = api.inherit('Profile', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name'),
    'age': fields.Integer(attribute='age', description='age'),
    'semester': fields.Integer(attribute='semester', description='semester'),
    'major': fields.String(attribute='major', description='major'),
    'hobbys': fields.String(attribute='hobbys', description='hobbys'),
    'interests': fields.String(attribute='interests', description='interests'),
    'personality': fields.String(attribute='personality', description='personality'),
    'learnstyle': fields.String(attribute='learnstyle', description='learnstyle'),
    'studytime': fields.String(attribute='studytime', description='studytime'),
    'studyplace': fields.String(attribute='studyplace', description='studyplace'),
    'studyfrequence': fields.Integer(attribute='studyfrequence', description='studyfrequence'),
    'workexperience': fields.String(attribute='workexperience', description='workexperience'),
})

group = api.inherit('Group', bo, {
    'groupname': fields.String(attribute='groupname', description='groupname'),
    'admin': fields.Integer(attribute='admin', description='admin'),
    'description': fields.String(attribute='description', description='description'),
    'chatid': fields.Integer(attribute='chatid', description='chatid'),
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
    'requested': fields.String(attribute='requested', description='requested'),
    'requested_by': fields.String(attribute='requested_by', description='requested_by'),
    'request_type': fields.String(attribute='request_type', description='request_type'),
    # 'request_date': fields.String(attribute = 'request_date', description = 'request_date')
})


# Message
@api.route('/message')
class MessageOperations(Resource):
    @api.marshal_with(message)
    @api.expect(message)
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
    def get(self):
        adm = Businesslogic()
        msg = adm.get_all_messages()
        return msg


@api.route('/message/<int:id>')
@api.param('id', 'Die ID der Nachricht')
class MessageWithIDOperations(Resource):
    @api.marshal_with(message)
    def get(self, id):
        adm = Businesslogic()
        msg = adm.get_message_by_id(id)
        return msg

    @api.marshal_with(message)
    def delete(self, id):
        adm = Businesslogic()
        msgs = adm.get_message_by_id(id)
        adm.delete_message(msgs)
        return ''

    @api.marshal_with(message)
    @api.expect(message, validate=True)
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
    def get(self, room):
        adm = Businesslogic()
        messages = adm.get_messages_by_room_id(room)
        return messages


# Chatroom
@api.route('/chatroom')
class ChatroomOperations(Resource):
    @api.marshal_with(chatroom)
    @api.expect(chatroom)
    def post(self):
        adm = Businesslogic()
        proposal = ChatroomBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chatroom(
                proposal.get_chattype()
            )
            return p

    @api.marshal_list_with(chatroom)
    def get(self):
        adm = Businesslogic()
        room = adm.get_all_rooms()
        return room


@api.route('/chatroom/<int:id>')
@api.param('id', 'Die ID des Chatraums')
class ChatroomWithIDOperations(Resource):
    @api.marshal_with(chatroom)
    def get(self, id):
        adm = Businesslogic()
        room = adm.get_room_by_id(id)
        return room

    @api.marshal_with(chatroom)
    def delete(self, id):
        adm = Businesslogic()
        room = adm.get_room_by_id(id)
        adm.delete_chatroom(room)
        return ''

    @api.marshal_with(chatroom)
    @api.expect(chatroom, validate=True)
    def put(self, id):
        adm = Businesslogic()
        p = ChatroomBO.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_message(p)
            return p, 200
        else:
            return '', 500


# Chataccess
@api.route('/chataccess')
class ChataccessOperations(Resource):
    @api.marshal_with(chataccess)
    @api.expect(chataccess)
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
    def get(self):
        adm = Businesslogic()
        access = adm.get_all_chataccess()
        return access


@api.route('/chataccess/<int:id>')
@api.param('id', 'Die ID des Chataccess')
class ChataccessWithIDOperations(Resource):
    @api.marshal_with(chataccess)
    def get(self, id):
        adm = Businesslogic()
        access = adm.get_chataccess_by_id(id)
        return access

    @api.marshal_with(chataccess)
    def delete(self, id):
        adm = Businesslogic()
        adm.delete_chataccess(id)
        return ''

    @api.marshal_with(chataccess)
    @api.expect(chatroom, validate=True)
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
    def get(self, room):
        adm = Businesslogic()
        profiles = adm.get_profiles_by_room(room)
        return profiles

# Mitglieder hinzufügen


@api.route('/chataccess_new_member')
class ChataccessNewMembers (Resource):
    @api.marshal_with(chataccess)
    @api.expect(chataccess)
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
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_groupchats_by_profile(profile_id)
        return rooms


@api.route('/chataccess_singlechat/<int:profile_id>')
@api.param('profile_id', 'Id des Profils')
class FindSinglechats(Resource):
    @api.marshal_with(chatroom)
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_singlechats_by_profile(profile_id)
        return rooms

@api.route('/chataccess_chats/<int:profile_id>')
@api.param('profile_id', 'Id des Profils')
class FindChatsByProfile(Resource):
    @api.marshal_with(chatroom)
    def get(self, profile_id):
        adm = Businesslogic()
        rooms = adm.get_chatroom_by_profile(profile_id)
        return rooms

@api.route('/chataccess_delete/<int:profile_id>/room/<int:room>')
@api.param('profile_id', 'ID des Profils', 'room - ID des Raums')
class DeleteTargetedChataccess(Resource):
    @api.marshal_with(chataccess)
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
    def post(self):
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
    def get(self):
        adm = Businesslogic()
        profile = adm.get_all_profiles()
        return profile


@api.route('/profile/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Profilanzeigen (Resource):
    @api.marshal_with(profile)
    def get(self, id):
        adm = Businesslogic()
        userprofile = adm.get_profile_by_id(id)
        return userprofile

    @api.marshal_with(profile)
    def delete(self, id):

        adm = Businesslogic()
        userprofile = adm.get_profile_by_id(id)
        adm.delete_profile(userprofile)
        return ''

    @api.marshal_with(profile)
    @api.expect(profile, validate=True)
    def put(self, id):
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
    def get(self, lastname):
        adm = Businesslogic()
        profile = adm.get_profile_by_name(lastname)
        return profile

# Group


@api.route('/group')
class GroupOperations(Resource):
    @api.marshal_with(group)
    @api.expect(group)
    def post(self):
        adm = Businesslogic()
        proposal = Group.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_group(
                proposal.get_group_name(),
                proposal.get_admin(),
                proposal.get_description()
            )
            return p

    @api.marshal_with(group)
    def get(self):
        adm = Businesslogic()
        groups = adm.get_all_groups()
        return groups


@api.route('/group/<int:id>')
@api.param('id', 'Die ID des Gruppen-Objekts')
class Gruppeanzeigen (Resource):
    @api.marshal_with(group)
    def get(self, id):
        adm = Businesslogic()
        group = adm.get_group_by_id(id)
        return group


@api.route('/groups_of_profile/<int:id>')
@api.param('ID eingeben für Profil')
class GroupsforProfile(Resource):
    @api.marshal_with(group)
    def get(self, id):
        adm = Businesslogic()
        return adm.get_group_by_profileid(id)


# Member
@api.route('/member')
class MemberOperations(Resource):
    @api.marshal_list_with(member)
    def get(self):
        adm = Businesslogic()
        members = adm.get_members()
        return members


@api.route('/profiles-by-name/<string:lastname>')
@api.param('lastname', 'Der Nachname des Kunden')
class ProfilesByNameOperations(Resource):
    @api.marshal_with(member)
    def get(self, lastname):
        adm = Businesslogic()
        profile = adm.get_profile_by_name(lastname)
        return profile


# Request
@api.route('/requests')
class RequestOperations(Resource):
    @api.marshal_with(request)
    @api.expect(request)
    def post(self):
        adm = Businesslogic()
        proposal = Request.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_request(
                proposal.get_requested(),
                proposal.get_requested_by(),
                proposal.get_request_type()
            )
            return p

    @api.marshal_list_with(request)
    def get(self):
        adm = Businesslogic()
        requests = adm.get_all_requests()
        return requests


@api.route('/profile_of_request/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class ProfileofRequestanzeigen (Resource):
    @api.marshal_with(matchmaker_profile)
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_profiles_of_request(id)
        return request

@api.route('/request_for_profile/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class RequestofProfile(Resource):
    @api.marshal_with(request)
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_of_profile(id)
        return request

@api.route('/request_for_group/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class RequestofGroup(Resource):
    @api.marshal_with(request)
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_of_groups(id)
        return request


@api.route('/request/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Requestanzeigen(Resource):
    @api.marshal_with(request)
    def get(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        return request

    @api.marshal_with(request)
    def delete(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        adm.delete_request(request)


@api.route('/delete_profile_request/<int:id1>/requested_by/<int:id2>')
@api.param('id1', 'id des requested', 'id2 - id des requested_by')
class ProfileRequestDelete(Resource):
    @api.marshal_with(request)
    def delete(self, id1, id2):
        adm = Businesslogic()
        requests = adm.get_request_of_profile(id1)
        for element in requests:
            if element.requested_by == id2 and element.request_type() == 'E':
                adm.delete_request(element)

@api.route('/delete_group_request/<int:id1>/requested_by/<int:id2>')
@api.param('id1', 'id des requested', 'id2 - id des requested_by')
class GroupRequestDelete(Resource):
    @api.marshal_with(request)
    def delete(self, id1, id2):
        adm = Businesslogic()
        requests = adm.get_request_of_profile(id1)
        for element in requests:
            if element.requested_by == id2 and element.request_type() == 'G':
                adm.delete_request(element)

@api.route('/matches/<int:id>')
class Matcher(Resource):
    @api.marshal_with(matchmaker_profile)
    def get(self, id):
        adm = Businesslogic()
        matches = adm.matching_list(id)
        return matches

    @api.marshal_with(request)
    def delete(self, id):
        adm = Businesslogic()
        request = adm.get_request_by_id(id)
        adm.delete_request(request)
        return ''


if __name__ == '__main__':
    app.run(debug=True)
