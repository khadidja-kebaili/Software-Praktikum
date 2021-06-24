from inspect import Attribute
from flask import Flask
from flask_restx import Resource, Api, fields
from server.Businesslogik import Businesslogik
#from server.BO.Profile import Studentprofile
from flask_cors import CORS

from server.db.GroupMapper import GroupMapper
from server.bo.GroupBO import GroupBO
# from SecurityDecorator import secured


app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

# user = api.inherit('User', bo, {
#     'name': fields.String(attribute='_name', description='Name eines Benutzers'),
#     'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
#     'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
# })
# profile = api.inherit('Profil', bo, {
#     'first_name': fields.String(attribute='first_name', description='first_name'),
#     'last_name': fields.String(attribute='last_name', description='last_name'),
#     'age': fields.Integer(attribute='age', description='age'),
#     'semester': fields.Integer(attribute='semester', description='semester'),
#     'major': fields.String(attribute='major', description='major'),
#     'hobbys': fields.String(attribute='hobbys', description='hobbys'),
#     'interests': fields.String(attribute='interests', description='interests'),
#     'personality': fields.String(attribute='personality', description='personality'),
#     'learnstyle': fields.String(attribute='learnstyle', description='learnstyle'),
#     'studytime': fields.String(attribute='studytime', description='studytime'),
#     'studyplace': fields.String(attribute='studyplace', description='studyplace'),
#     'studyfrequence': fields.Integer(attribute='studyfrequence', description='studyfrequence'),
#     'workexperience': fields.String(attribute='workexperience', description='workexperience'),
# })

group = api.inherit('Group', bo, {
    'id': fields.Integer(attribute='id', description='id'),
    'admin': fields.String(attribute='admin', description='admin'),
    'description': fields.String(attribute='description', description='description'),
    'groupname': fields.String(attribute='groupname', description='groupname'),
    'chatid': fields.Integer(attribute='chatid', description='chatid'),
    #'memberlist': fields.List(fields.Integer, attribute='memberlist', description='memberlist')
    })

member = api.inherit('Member', bo,{
    'memberlist': fields.List(fields.Integer, attribute='memberlist', description='memberlist')
    })

# @api.route('/profile')
# class ProfilOperations(Resource):
#     @api.marshal_with(profile)
#     @api.expect(profile)
#     def post(self):
#         adm = Businesslogic()
#         proposal = Studentprofile.from_dict(api.payload)
#         # //Notiz Daten von Frontend werden in proposal gespeichert
#         if proposal is not None:

#             p = adm.create_profile(
#                 proposal.get_first_name(),
#                 proposal.get_last_name(), proposal.get_age(),
#                 proposal.get_semester(), proposal.get_major(),
#                 proposal.get_hobbys(), proposal.get_interests(),
#                 proposal.get_personality(), proposal.get_learnstyle(),
#                 proposal.get_studytime(), proposal.get_studyplace(),
#                 proposal.get_studyfrequence(),
#                 proposal.get_workexperience()
#             )
#             return p

#     @api.marshal_list_with(profile)
#     def get(self):
#         adm = Businesslogic()
#         profile = adm.get_all_profiles()
#         return profile


# @api.route('/matches/<int:id>')
# class Matcher(Resource):
#     @api.marshal_with(profile)
#     def get(self, id):
#         adm = Businesslogic()
#         matches = adm.matching_list(id)
#         return matches


# @api.route('/profile/<int:id>')
# @api.param('id', 'Die ID des Profil-Objekts')
# class Profilanzeigen (Resource):
#     @api.marshal_with(profile)
#     def get(self, id):
#         adm = Businesslogic()
#         userprofile = adm.get_profile_by_id(id)
#         return userprofile

#     @api.marshal_with(profile)
#     def delete(self, id):

#         adm = Businesslogic()
#         userprofile = adm.get_profile_by_id(id)
#         adm.delete_profile(userprofile)
#         return ''

#     @api.marshal_with(profile)
#     @api.expect(profile, validate=True)
#     def put(self, id):
#         adm = Businesslogic()
#         p = Studentprofile.from_dict(api.payload)

#         if p is not None:
#             p.set_id(id)
#             adm.save_profile(p)
#             return p, 200
#         else:
#             return '', 500






@api.route('/group')
class Group (Resource):
    @api.marshal_with(group)
    @api.expect(group)
    def post(self):     #neue Gruppe erstellen
        adm = Businesslogik()
        group = GroupBO.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if group is not None:

            p = adm.create_group(group)
               
            return p


@api.route('/group/<int:id>')
@api.param('id', 'Die ID der gruppe')
class GroupById (Resource):
    @api.marshal_with(group)
    @api.expect(group)
    def put(self,id): # ist update der gruppe
        adm = Businesslogik()
        group = GroupBO.from_dict(api.payload)

        group.set_id(id)
        # //Notiz Daten von Frontend werden in group gespeichert
        if group is not None:

            p = adm.update_group(group)
            return p 

    @api.marshal_with(group)
    def get(self, id):
        adm = Businesslogik()
        group = adm.get_group_by_gruppenid(id)
        return group

    @api.marshal_with(group)
    def delete(self, id):

        adm = Businesslogik()
        group = adm.get_group_by_gruppenid(id)
        adm.delete_group(group)
        return ''

    @api.marshal_with(group)
    @api.expect(group, validate=True)
    def put(self, id):
        adm = Businesslogik()
        p = group.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_group(p)
            return p, 200
        else:
            return '', 500            
 


@api.route('/group/<int:id>/members/')
class Member(Resource):
    @api.marshal_with(member)
    @api.expect(member)
    def post(self,id):     #neue Member hinzufügen
        adm = Businesslogik()
        group=adm.get_group_by_gruppenid(id)
        if group is None:
            return "not found", 400
        members = api.payload['memberlist']
        
        if members is not None:
            for member in members:
                adm.group_add_member(group,member)
               
            return adm.get_group_by_gruppenid(id)

@api.route('/group/<int:id>/members/<int:memberid>')
class MemberById(Resource):
    @api.marshal_with(member)
    def delete(self,id, memberid):     # Member löschen
        adm = Businesslogik()
        group=adm.get_group_by_gruppenid(id)
        if group is None:
            return "", 400
        adm.group_delete_member(group,memberid)
               
        return adm.get_group_by_gruppenid(id)



 
if __name__ == '__main__':
    app.run(debug=True)