from flask import Flask
from flask_restx import Resource, Api, fields
# from server.Test_Businesslogic import Businesslogik
from server.Test_Businesslogic import Businesslogik
from server.bo.Test_Profil import Studentprofil
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
profil = api.inherit('Profil', bo, {
    'name': fields.String(attribute='name', description='name'),
    'vorname': fields.String(attribute='vorname', description='vorname'),
    'alter': fields.Integer(attribute='alter', description='alter'),
    'semester': fields.Integer(attribute='semester', description='semester'),
    'studiengang': fields.String(attribute='studiengang', description='studiengang'),
    'hobbies': fields.String(attribute='hobbies', description='hobbies'),
    'interessen': fields.String(attribute='interessen', description='interessen'),
    'persönlichkeit': fields.Integer(attribute='persönlichkeit', description='persönlichkeit'),
    'lerntyp': fields.String(attribute='lerntyp', description='lerntyp'),
    'lernzeitraum': fields.String(attribute='lernzeitraum', description='lernzeitraum'),
    'lernort': fields.String(attribute='lernort', description='lernort'),
    'lernfrequenz': fields.Integer(attribute='lernfrequenz', description='lernfrequenz'),
    'berufserfahrung': fields.String(attribute='berufserfahrung', description='berufserfahrung'),
})



@api.route('/profil')
class Profilerstellen(Resource):
    @api.marshal_with(profil)
    @api.expect(profil)
    def post(self):
        adm = Businesslogik()
        proposal = Studentprofil.from_dict(api.payload)
        # //Notiz Daten von Frontend werden in proposal gespeichert
        if proposal is not None:

            p = adm.create_profil(
                proposal.get_name(),
                proposal.get_vorname(), proposal.get_alter(),
                proposal.get_semester(), proposal.get_studiengang(),
                proposal.get_hobbies(), proposal.get_interessen(),
                proposal.get_persönlichkeit(), proposal.get_lerntyp(),
                proposal.get_lernzeitraum(), proposal.get_lernort(),
                proposal.get_lernfrequenz(),
                proposal.get_berufserfahrung()
            )
            return p

    @api.marshal_list_with(profil)
    def get(self):
        adm = Businesslogik()
        profil = adm.get_all_profiles()
        return profil


@api.route('/profil/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Profilanzeigen (Resource):
    @api.marshal_with(profil)
    def get(self, id):
        adm = Businesslogik()
        userprofil = adm.get_profil_by_id(id)
        return userprofil

    @api.marshal_with(profil)
    def delete(self, id):

        adm = Businesslogik()
        userprofil = adm.get_profil_by_id(id)
        adm.delete_profil(userprofil)
        return ''

    @api.marshal_with(profil)
    @api.expect(profil, validate=True)
    def put(self, id):
        adm = Businesslogik()
        p = Studentprofil.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_profil(p)
            return p, 200
        else:
            return '', 500

@api.route('/matchmaking/<int:id>')
@api.param('id', 'Die ID des Account-Objekts')
class Matcher(Resource):
    @api.marshal_with(profil)
    def get(self, id):
        adm = Businesslogik()
        matches = adm.into_list(id)
        return matches

# Test 
@api.route('/matches')
class Profilanzeigen (Resource):
    def get(self):
        adm = Businesslogik()
        profile = adm.get_matches()
        return profile

if __name__ == '__main__':
    app.run(debug=True)