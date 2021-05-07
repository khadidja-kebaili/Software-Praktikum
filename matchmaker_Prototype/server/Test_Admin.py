from matchmaker_Prototype.server.BO.Profil import Studentprofil
from matchmaker_Prototype.server.db.ProfileMapper import StudentprofilMapper

class Businesslogik (object):

    def __init__(self):
        pass

    def create_profil(self, name, vorname, alter, semester, studiengang, hobbies, interessen,
                      persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung, email, passwort):
        studentprofil = Studentprofil()
        studentprofil.set_name(name)
        studentprofil.set_vorname(vorname)
        studentprofil.set_alter(alter)
        studentprofil.set_semester(semester)
        studentprofil.set_studiengang(studiengang)
        studentprofil.set_hobbies(hobbies)
        studentprofil.set_interessen(interessen)
        studentprofil.set_persönlichkeit(persönlichkeit)
        studentprofil.set_lerntyp(lerntyp)
        studentprofil.set_lernzeitraum(lernzeitraum)
        studentprofil.set_lernort(lernort)
        studentprofil.set_lernfrequenz(lernfrequenz)
        studentprofil.set_berufserfahrung(berufserfahrung)
        studentprofil.set_email(email)
        studentprofil.set_passwort(passwort)
        studentprofil.set_requested_by= None

        with StudentprofilMapper() as mapper:
            return mapper.insert(studentprofil)

    def get_profil_by_id(self, number):
        with StudentprofilMapper() as mapper:
            return mapper.find_by_key(number)

    def save_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.update(studentprofil)

    def delete_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.delete(studentprofil)

    def get_all_profiles(self):
        """Alle Benutzer auslesen."""
        with StudentprofilMapper() as mapper:
            return mapper.find_all()

#####################################################################

    def matchmaking_for_two(self, profile1, profile2):
        newList = []
        no_match = []
        score = 0
        list1 = self.get_learning_habbits(profile2)
        list2 = self.get_learning_habbits(profile1)
        for element in list1:
                if element in list2:
                    items = [element]
                    newList.append(items)
                elif element not in list2:
                    elements = [element]
                    no_match.append(elements)
        # print (no_match)
        # print(newList)
        score += len(newList) - len(no_match)
        # if score >= 1:
        #     return score
        # else:
        #     return 0
        return score

    def get_learning_habbits(self, id):
        profile = self.get_profil_by_id(id)
        learning_habbits = [profile.get_lernzeitraum(), profile.get_semester(), profile.get_lernort(), profile.get_lerntyp(),
                profile.get_hobbies(), profile.get_studiengang(), profile.get_lernfrequenz()]
        return learning_habbits

    def print_matches_for_id(self, student1, student2):
        print("")
        print("Hier sind die Matches für den Studenten mit der ID: ", int(student1))
        # print(self)
        print("\t%s: %s" % (self.matchmaking_for_two(student1, student2), self.get_profil_by_id(student2)))

    def print_all_matches(self, profile1):
        result = len(self.get_all_profiles())
        for element in range(1, result + 1):
            self.print_matches_for_id(profile1, element)