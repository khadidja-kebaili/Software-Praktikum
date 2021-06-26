from flask import Flask
from flask_restx import Resource, Api, fields
from src.server.Businesslogic import Businesslogic
from server.bo.ProfileBO import Studentprofile
# from server.bo.GroupBO import Group
from server.bo.MessageBO import MessageBO
from server.bo.ChatroomBO import ChatroomBO
from server.bo.ChatAccessBO import ChatAccessBO
from flask_cors import CORS
# from SecurityDecorator import secured


app = Flask(__name__);
CORS(app, resources=r'/*');
api = Api(app);

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

message = api.inherit('Message', bo, {
    'profilID': fields.Integer(attribute='profilID',description='ID des Senders'),
    'room': fields.Integer(attribute='room', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text')
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
})
profile = api.inherit('Profil', bo, {
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
    'admin': fields.String(attribute='admin', description='admin'),
    'description': fields.String(attribute='description', description='description')
})
member = api.inherit('Member', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name')
})
chatroom = api.inherit('Chatroom', bo, {
    'chattype':fields.String(attribute='chattype', description = 'Art des Chatraums (e-Einzel, g-Gruppe)')
})

chataccess = api.inherit('Chataccess', bo, {
    'profilID': fields.Integer(attribute='profilID', description='ID des Profils'),
    'room': fields.Integer(attribute='profilID', description='ID des Raums'),
    'chattype':fields.String(attribute='chattype', description='Art des Chatraums (e-Einzel, g-Gruppe)')
})


@api.route('/message')
class MessageOperations(Resource):
    @api.marshal_with(message)
    @api.expect(message)
    def post(self):
        adm = Businesslogic();
        proposal = MessageBO.from_dict(api.payload);
        if proposal is not None:
            p = adm.create_message(
                proposal.get_profilID(),
                proposal.get_room(),
                proposal.get_text()
            )
            return p;

    @api.marshal_list_with(message)
    def get(self):
        adm = Businesslogic();
        message = adm.get_allMessages();
        return message;


@api.route('/message/<int:id>')
@api.param('id', 'Die ID der Nachricht')
class Message_withID_Operations(Resource):
    @api.marshal_with(message)
    def get(self, id):
        adm = Businesslogic();
        message = adm.get_message_by_id(id);
        return message;

    @api.marshal_with(message)
    def delete(self, id):
        adm = Businesslogic();
        messages = adm.get_message_by_id(id);
        adm.delete_message(messages);
        return ''

    @api.marshal_with(message)
    @api.expect(message, validate=True)
    def put(self, id):
        adm = Businesslogic();
        p = MessageBO.from_dict(api.payload);

        if p is not None:
            p.set_id(id);
            adm.update_message(p);
            return p, 200
        else:
            return '', 500


@api.route('/chatroom_message/<int:room>')
@api.param('room', 'Die Id des Chatraums')
class find_MessagesByRoom(Resource):
    @api.marshal_with(chatroom)
    def get(self, id):
        adm = Businesslogic();
        messages = adm.get_messages_by_roomID(id)
        return messages


# Chatroom

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


@api.route('/group')
class GroupOperations(Resource):
    @api.marshal_with(group)
    @api.expect(group)
    def post(self):
        adm = Businesslogic()
        proposal = Group.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_group_for_profile(
                proposal.get_group_name(),
                proposal.get_description()
            )
            return p

    @api.marshal_list_with(group)
    def get(self):
        adm = Businesslogic()
        groups = adm.get_all_groups()
        return group


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


if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask
# from flask_restx import Resource, Api, fields
# # from server.Test_Businesslogic import Businesslogik
# from server.Test_Businesslogic import Businesslogik
# from server.bo.Test_Profil import Studentprofil
# from flask_cors import CORS

# # from SecurityDecorator import secured

# app = Flask(__name__)

# CORS(app, resources=r'/*')

# api = Api(app)



# bo = api.model('BusinessObject', {
#     'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
# })


# user = api.inherit('User', bo, {
#     'name': fields.String(attribute='_name', description='Name eines Benutzers'),
#     'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
#     'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
# })
# profil = api.inherit('Profil', bo, {
#     'name': fields.String(attribute='name', description='name'),
#     'vorname': fields.String(attribute='vorname', description='vorname'),
#     'alter': fields.Integer(attribute='alter', description='alter'),
#     'semester': fields.Integer(attribute='semester', description='semester'),
#     'studiengang': fields.String(attribute='studiengang', description='studiengang'),
#     'hobbies': fields.String(attribute='hobbies', description='hobbies'),
#     'interessen': fields.String(attribute='interessen', description='interessen'),
#     'persönlichkeit': fields.Integer(attribute='persönlichkeit', description='persönlichkeit'),
#     'lerntyp': fields.String(attribute='lerntyp', description='lerntyp'),
#     'lernzeitraum': fields.String(attribute='lernzeitraum', description='lernzeitraum'),
#     'lernort': fields.String(attribute='lernort', description='lernort'),
#     'lernfrequenz': fields.Integer(attribute='lernfrequenz', description='lernfrequenz'),
#     'berufserfahrung': fields.String(attribute='berufserfahrung', description='berufserfahrung'),
# })



# @api.route('/profil')
# class Profilerstellen(Resource):
#     @api.marshal_with(profil)
#     @api.expect(profil)
#     def post(self):
#         adm = Businesslogik()
#         proposal = Studentprofil.from_dict(api.payload)
#         # //Notiz Daten von Frontend werden in proposal gespeichert
#         if proposal is not None:

#             p = adm.create_profil(
#                 proposal.get_name(),
#                 proposal.get_vorname(), proposal.get_alter(),
#                 proposal.get_semester(), proposal.get_studiengang(),
#                 proposal.get_hobbies(), proposal.get_interessen(),
#                 proposal.get_persönlichkeit(), proposal.get_lerntyp(),
#                 proposal.get_lernzeitraum(), proposal.get_lernort(),
#                 proposal.get_lernfrequenz(),
#                 proposal.get_berufserfahrung()
#             )
#             return p

#     @api.marshal_list_with(profil)
#     def get(self):
#         adm = Businesslogik()
#         profil = adm.get_all_profiles()
#         return profil


# @api.route('/profil/<int:id>')
# @api.param('id', 'Die ID des Profil-Objekts')
# class Profilanzeigen (Resource):
#     @api.marshal_with(profil)
#     def get(self, id):
#         adm = Businesslogik()
#         userprofil = adm.get_profil_by_id(id)
#         return userprofil

#     @api.marshal_with(profil)
#     def delete(self, id):

#         adm = Businesslogik()
#         userprofil = adm.get_profil_by_id(id)
#         adm.delete_profil(userprofil)
#         return ''

#     @api.marshal_with(profil)
#     @api.expect(profil, validate=True)
#     def put(self, id):
#         adm = Businesslogik()
#         p = Studentprofil.from_dict(api.payload)

#         if p is not None:
#             p.set_id(id)
#             adm.save_profil(p)
#             return p, 200
#         else:
#             return '', 500

# @api.route('/matchmaking/<int:id>')
# @api.param('id', 'Die ID des Account-Objekts')
# class Matcher(Resource):
#     @api.marshal_with(profil)
#     def get(self, id):
#         adm = Businesslogik()
#         matches = adm.into_list(id)
#         return matches

# # Test 
# @api.route('/matches')
# class Profilanzeigen (Resource):
#     def get(self):
#         adm = Businesslogik()
#         profile = adm.get_matches()
#         return profile

# #Test für Anfragen anzeigen
# @api.route('/request')
# class Profilanzeigen (Resource):
#     def get(self):
#         adm = Businesslogik()
#         profile = adm.get_request()
#         return profile


# if __name__ == '__main__':
#     app.run(debug=True)

