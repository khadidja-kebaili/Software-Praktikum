# from matchmaker_Prototype.server.BO.Profil import Studentprofil
# from matchmaker_Prototype.server.db.ProfileMapper import StudentprofilMapper
from .bo.ProfileBO import Studentprofil
from .db.Profilemapper import StudentprofileMapper

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

        with StudentprofileMapper() as mapper:
            return mapper.insert(studentprofil)

    def get_profil_by_id(self, number):
        with StudentprofileMapper() as mapper:
            return mapper.find_by_key(number)

    def save_profil(self, studentprofil):
        with StudentprofileMapper() as mapper:
            mapper.update(studentprofil)

    def delete_profil(self, studentprofil):
        with StudentprofileMapper() as mapper:
            mapper.delete(studentprofil)

    def get_all_profiles(self):
        """Alle Benutzer auslesen."""
        with StudentprofileMapper() as mapper:
            return mapper.find_all()

#####################################################################
    def set_score(self, profile1, profile2):
        newList = 0
        no_match = 0
        list1 = [self.get_learning_habbits(profile2)]
        list2 = [self.get_learning_habbits(profile1)]
        for element in list1:
                if element in list2:
                    newList += 1
                elif element not in list2:
                    no_match += 1
        score = newList - no_match
        return score

    def get_learning_habbits(self, id):
        profile = self.get_profil_by_id(id)
        learning_habbits = [profile.get_lernzeitraum(), profile.get_semester(), profile.get_lernort(), profile.get_lerntyp(),
                profile.get_hobbies(), profile.get_studiengang(), profile.get_lernfrequenz()]
        return learning_habbits


    # def print_set_score(self, student1, student2):
    #     print("")
    #     print("Hier sind die Matches für den Studenten mit der ID: ", int(student1))
    #     # print(self)
    #     print("\t%s: %s" % (self.set_score(student1, student2), self.get_profil_by_id(student2)))

    # def into_list(self, profile1):
    #     length = len(self.get_all_profiles())
    #     list = []
    #     for element in range(1, length + 1):
    #         self.print_matches_for_id(profile1, element)


    def into_list(self, id):
        list = []
        profiles = []
        for element in range(1,57):
            list.append(self.set_score(element, id))
        for element in self.get_all_profiles():
            profiles.append(element)
        dic = dict(zip(profiles, list))
        sort_orders = sorted(dic.items(), key=lambda x: x[1], reverse=True)
        return sort_orders


# BL = Businesslogik()
# match = BL.into_list(55)
# # print(BL.set_score(55,56))
# print(match)