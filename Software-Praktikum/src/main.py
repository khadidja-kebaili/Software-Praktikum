from flask import Flask
from flask_restx import Resource, Api, fields
from server.Businesslogic import Businesslogic
from server.bo.ProfileBO import Studentprofile
from server.bo.GroupBO import Group
from flask_cors import CORS
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
    'group_name': fields.String(attribute='first_name', description='first_name'),
    'description': fields.String(attribute='last_name', description='last_name')
})
member = api.inherit('Member', bo, {
    'first_name': fields.String(attribute='first_name', description='first_name'),
    'last_name': fields.String(attribute='last_name', description='last_name')
})


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
