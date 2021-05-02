from flask import Flask
from flask_restx import Resource, Api, fields
from matchmaker.server.Test_Admin import Businesslogik
from matchmaker.server.BO.Profil import Studentprofil
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
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
    'passwort':fields.String(attribute = 'passwort', description='passwort'),
    'email': fields.String(attribute = 'email', description = 'email')
})

match_list = []

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
                proposal.get_lernfrequenz(), proposal.get_email(),
                proposal.get_berufserfahrung(), proposal.get_passwort()
            )
            return p


@api.route('/profil/<int:id>')
@api.param('id', 'Die ID des Profil-Objekts')
class Profilanzeigen(Resource):
    @api.marshal_with(profil)
    def get(self, id):
        adm = Businesslogik()
        userprofil = adm.get_profil_by_id(id)
        return userprofil

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
@api.param('id', 'Die ID des Profil-Objekts')
class MatchesAnzeigen(Resource):
    @api.marshal_with(match_list)
    def get(self, id):
        adm = Businesslogik()
        matching = adm.get_matches_of_id(id)
        return matching



if __name__ == '__main__':
    app.run(debug=True)
