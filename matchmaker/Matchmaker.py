from matchmaking_V.Participant import Participant

class Matcher(object):

    fragende = []
    gefragte = []

    def __init__(self, data):
        # zuerst soll überprüft werden ob tatsächlich Daten vorhanden sind
        if len(data) != 0:
            self.data = data

        # Hier wird für jeden fragenden und jeden gefragten ein Participant-Objekt erstellt.
        for element in self.data:
            if element.get('type') == 'fragender':
                self.fragende.append(Participant(element))
            elif element.get('type') == 'gefragter':
                self.gefragte.append(Participant(element))

    def get_matches(self):
        for element in self.fragende:
            element.match(self.gefragte)
        return self.fragende

    def get_matches_of_id(self, id):
        for element in self.fragende:
            if int(element.id[0]) == id:
                element.match(self.gefragte)
        return self.fragende

    def return_self_fragende(self):
        for match in self.fragende:
            print(match)


