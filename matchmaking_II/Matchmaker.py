from matchmaking_II.Participant import Participant

class Matcher(object):

    fragende = set()
    gefragte = []

    def __init__(self, data):
        # zuerst soll überprüft werden ob tatsächlich Daten vorhanden sind
        if len(data) != 0:
            self.data = data

        # Hier wird für jeden fragenden und jeden gefragten ein Participant-Objekt erstellt.
        for element in self.data:
            if element.get('type') == 'fragender':
                self.fragende.add(Participant(element))
            elif element.get('type') == 'gefragter':
                self.gefragte.append(Participant(element))

    def get_matches(self):
        for element in self.fragende:
            element.match(self.gefragte)
        return self.fragende

    def __delattr__(self, item):
        self.fragende.__delattr__(item)

#HalliHallo