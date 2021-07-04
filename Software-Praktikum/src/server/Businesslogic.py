from server.db.RequestMapper import RequestMapper
from server.bo.RequestBO import Request
from datetime import datetime
from server.bo.ProfileBO import Studentprofile
from server.bo.GroupBO import Group
from server.db.Profilemapper import StudentprofileMapper
from server.db.GroupMapper import GroupMapper
from server.bo.ChatAccessBO import ChatAccessBO
from server.db.ChatAccessMapper import ChatAccessMapper
from server.bo.MessageBO import MessageBO
from server.db.MessageMapper import MessageMapper
from server.bo.ChatroomBO import ChatroomBO
from server.db.ChatroomMapper import ChatroomMapper
from server.bo.UserBO import User
from server.db.UserMapper import UserMapper


class Businesslogic(object):

    def __init__(self):
        self.check_timedelta_of_request()

  # User-spezifische Methoden

    def create_user(self, name, email, google_user_id):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_user_id(google_user_id)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, name):
        """Alle Benutzer mit Namen name auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, number):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(number)

    def get_user_by_email(self, email):
        """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_email(email)

    def get_user_by_google_user_id(self, id):
        """Den Benutzer mit der gegebenen Google ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_users(self):
        """Alle Benutzer auslesen."""
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        """Den gegebenen Benutzer speichern."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """Den gegebenen Benutzer aus unserem System löschen."""
        with UserMapper() as mapper:
            mapper.delete(user)

    # Profil

    def create_profile(self, id, first_name, last_name, age, semester, major, hobbys, interests,
                       personality, learnstyle, studytime, studyplace, studyfrequence, workexperience):
        """Ein Profil anlegen"""
        studentprofile = Studentprofile()
        studentprofile.set_first_name(first_name)
        studentprofile.set_last_name(last_name)
        studentprofile.set_age(age)
        studentprofile.set_semester(semester)
        studentprofile.set_major(major)
        studentprofile.set_hobbies(hobbys)
        studentprofile.set_interests(interests)
        studentprofile.set_personality(personality)
        studentprofile.set_learn_style(learnstyle)
        studentprofile.set_study_time(studytime)
        studentprofile.set_study_place(studyplace)
        studentprofile.set_study_frequence(studyfrequence)
        studentprofile.set_work_experience(workexperience)
        studentprofile.set_id(id)

        with StudentprofileMapper() as mapper:
            return mapper.insert(studentprofile)

    def get_profile_by_id(self, number):
        """Ein bestimmtes Profil auslesen"""
        with StudentprofileMapper() as mapper:
            return mapper.find_by_key(number)

    def get_all_profiles(self):
        """Alle Profile auslesen"""
        with StudentprofileMapper() as mapper:
            return mapper.find_all()

    def save_profile(self, studentprofile):
        """Das gegebene Profil speichern"""
        with StudentprofileMapper() as mapper:
            mapper.update(studentprofile)

    def delete_profile(self, studentprofile):
        """Das gegebene Profil löschen"""
        with StudentprofileMapper() as mapper:
            mapper.delete(studentprofile)

    def get_profile_by_name(self, last_name):
        """Das Profil mit dem gegebenen Nachnamen auslesen"""
        with StudentprofileMapper() as mapper:
            return mapper.find_by_last_name(last_name)

    # Group

    def create_group(self, groupname, admin, description):
        chatroom = self.create_chatroom('G')
        chataccess = self.create_chataccess(
            admin, chatroom.get_id(), 'G')
        group = Group()
        group.set_groupname(groupname)
        group.set_admin(admin)
        group.set_description(description)
        group.set_chatid(chatroom.get_id())
        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_all_groups(self):
        with GroupMapper() as mapper:
            return mapper.find_all()

    def get_group_by_id(self, number):
        with GroupMapper() as mapper:
            return mapper.find_by_key(number)

    def save_group(self, group):
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        with GroupMapper() as mapper:
            mapper.delete(group)

    '''Hier beginnt das Matchmaking  Author & Git-Username: @Khadidja.Kebaili'''

    '''Für das Matchmaking werden diejenigen Attribute, die relevant sind für das Auffinden eines passendes
        Lernpartners von den Studentenprofilen extrahiert, miteinander verglichen und ein Score, also der Wert, der 
        angibt wie gut 2 Profile zusammenpassen, berechnet. Anschließend werden die Profile dem Score nach sortiert
        in eine Liste gespeichert.
        Dazu gibt es die Methoden get_learning_habits, set_score & set_matching_list '''

    '''Zuerst werden die für den Profilvergleich relevanten Attribute der Profile als sogenannte learning-habits
    zusammengefasst. Dazu zählen Semester (1-7), Lernzeitraum (studytime), Lernort (studyplace), Lerntyp (learnstyle),
     Studiengang (major) und Lernfrequenz (studyfrequenz).'''

    def get_learning_habits(self, id):
        profile = self.get_profile_by_id(id)
        learning_habits = [profile.get_study_time(), profile.get_semester(), profile.get_study_place(),
                           profile.get_learn_style(), profile.get_hobbies(), profile.get_major(),
                           profile.get_study_frequence()]
        return learning_habits

    '''In dieser Funktion werden die Lerngewohnheiten von einem Profil mit einem anderen verglichen und anhand
    der Gemeinsamkeiten ein Score berechnet. 
    Es gilt, je höher der Score, desto besser passen zwei Profile zueinander, bzw. desto mehr haben sie gemeinsam.'''

    def set_score(self, profile1, profile2):
        '''Der match_score dient hier als Zähler. Wann imer ein Objekt in der Liste der Lerngewohnheiten des
        1. Studentens mit der profile1 auch in der Liste der Lerngewohnheiten des 2. Studentens mit der profile2 ist,
         so steigt der match_score um eins.'''
        match_score = 0
        list1 = self.get_learning_habits(profile1)
        list2 = self.get_learning_habits(profile2)
        for element in list1:
            if element in list2:
                match_score += 1
        return match_score

    '''In dieser Funktion wird ein Profil mit allen anderen in der Datenbank verfügbaren Profilen verglichen.
     Als Argument wird die ProfilID übergeben welche mit den restlichen Profilen verglichen werden soll.'''

    def set_matching_list(self, id):
        '''Alle Profile, abgesehen von dem Profil des Studierenden selbst werden in einen Array gespeichert. Für die
        einzelnen Array-Einträge werden die Scores zu dem Profil berechnet und in einer separaten Liste gespeichert.'''
        all_profiles = self.get_all_profiles()
        scores = []
        profiles = []
        for element in all_profiles:
            if element.get_id() != id:
                profiles.append(self.get_profile_by_id(element.get_id()))
                scores.append(self.set_score(element.get_id(), id))
        '''Nachdem die Listen gefüllt sind, werden diese in ein dictionary gezippt. Dieses Dictionary wird dann nach
        den Scores sortiert und in eine Liste umgewandelt. Die Listeninhalte sind die weiterhin nach dem Score 
        sortierten Profile. '''
        match_dict = dict(zip(profiles, scores))
        matches = dict(sorted(match_dict.items(),
                       key=lambda item: item[1], reverse=True))
        sorted_list = []
        for element in matches:
            sorted_list.append(element)
        return sorted_list

    '''Mit dieser Methode wird eine RequestBO erstellt, in dem man der Funktion den Anfragenden (requested_by),
    den Anzufragenden (requested) und die Art von Request - E für Einzel-Request von User zu User und G für
    Gruppen-Request, also von einem User zum Gruppenadmin.
    Handelt es sich um eine Einzelanfrage, so wird die group_id 0 eingesetzt. 
    Handelt es sich um eine Gruppenanfrage, so wird der Default-Wert beim Funktionsaufruf und 
    Parameterübergabe überschrieben'''

    def create_request(self, requested_by, requested, request_type, group_id=0):
        '''Zunächst einmal so gecheckt werden ob es ein Request vom Anfragenden zum Angefragten bereits
        existiert, damit keine redundanten Datenbankeinträge existieren.
        Existiert bereits eine Request wird die Funktion beendet, ansonsten wird ein Request erstellt.'''
        requests = self.get_all_requests()
        request_list = []
        for element in requests:
            if (element.get_requested_by() == requested_by) and (element.get_requested() == requested) and (
                    element.get_request_type() == request_type):
                request_list.append(element)
        if len(request_list) == 0:
            request = Request()
            request.set_requested_by(requested_by)
            request.set_requested(requested)
            request.set_request_type(request_type)
            if request_type == 'E':
                request.set_group_id(0)
            else:
                request.set_group_id(group_id)
            with RequestMapper() as mapper:
                return mapper.insert(request)

    '''Mit dieser Methode importiert man alle Requests aus der Datenbank.'''

    def get_all_requests(self):
        with RequestMapper() as mapper:
            return mapper.find_all()

    '''Mit dieser Methode wird eine Reuqest mit einer bestimmten ID aus der Datenbank importiert.'''

    def get_request_by_id(self, number):
        with RequestMapper() as mapper:
            return mapper.find_by_key(number)

    '''Mit dieser Funktion erhält man alle Requests an einen Studierenden dessen ID der Methode übergeben wurden'''

    def get_request_of_profile(self, number):
        all_requests = self.get_all_requests()
        request = []
        for element in all_requests:
            if element.get_requested() == number and element.get_request_type() == 'E':
                request.append(element)
        return request

    '''Mit dieser Methode werden alle Gruppen-Anfragen aus der Datenbank importiert.'''

    def get_request_of_groups(self, number):
        all_requests = self.get_all_requests()
        request = []
        for element in all_requests:
            if element.get_requested() == number and element.get_request_type() == 'G':
                request.append(element)
        return request

    '''Mit dieser Methoden werden die Profile aller Personen aus der Datenbank importiert, die dem Profil,
    dessen id der Funktion übergeben wurde eine Request geschickt haben.'''

    def get_profiles_of_request(self, id):
        requests_of_profile = self.get_request_of_profile(id)
        profile_ids_of_requester = []
        profiles_of_requester = []
        for element in requests_of_profile:
            profile_ids_of_requester.append(element.get_requested_by())
        for element in profile_ids_of_requester:
            profiles_of_requester.append(self.get_profile_by_id(element))
        return profiles_of_requester

    '''Hier wird eine Request gelöscht, indem man der Methode die RequestBO übergibt.'''

    def delete_request(self, request):
        with RequestMapper() as mapper:
            mapper.delete(request)

    '''Hier wird eine Request gelöscht, indem man der Methode 2 Ids übergibt: Die des Requested und die des
    Requested_by.'''

    def delete_request_by_ids(self, requested_id, requsted_by_id):
        all_requests = [self.get_all_requests()]
        for element in all_requests:
            for request in element:
                if request.get_requested_by() == requsted_by_id and request.get_requested() == requested_id:
                    self.delete_request(request)

    # Methoden für Message
    def create_message(self, profil, room, text):
        message = MessageBO()
        message.set_profile_id(profil)
        message.set_room(room)
        message.set_text(text)

        with MessageMapper() as mapper:
            return mapper.insert(message)

    def get_message_by_id(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_key(id)

    '''Alle Nachrichten eines Chatraums werden über die Id des Chatraums geholt'''

    def get_messages_by_room_id(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_room(id)

    def update_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message)

    def get_all_messages(self):
        with MessageMapper() as mapper:
            return mapper.find_all()

    # def get_room_by_user(self, id):
    #    with MessageMapper() as mapper:
    #        return mapper.find_associatedRooms(id);

    def delete_message(self, id):
        with MessageMapper() as mapper:
            return mapper.delete(id)

    # Methoden für Chatroom
    def create_chatroom(self, chattype):
        chatroom = ChatroomBO()
        chatroom.set_chattype(chattype)
        with ChatroomMapper() as mapper:
            return mapper.insert(chatroom)

    def get_all_rooms(self):
        with ChatroomMapper() as mapper:
            return mapper.find_all()

    def get_room_by_id(self, id):
        with ChatroomMapper() as mapper:
            return mapper.find_by_key(id)

    def delete_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.delete(room)

    def update_chatroom(self, room):
        with ChatroomMapper() as mapper:
            return mapper.update(room)

    # gibt die Größte Id der Chaträume zurück
    def latest_room(self):
        with ChatroomMapper() as mapper:
            hold = mapper.latest_room()
            return mapper.find_by_key(hold)



    # def create_chatroom_after_request(self, user1, user2):
    #     chatroom = ChatroomBO()
    #     chatroom.set_chattype('E')
    #     with ChatroomMapper() as mapper:
    #         mapper.insert(chatroom)
    #     room_id = chatroom.get_id()
    #     self.create_chataccess(user1, room_id, 'E')
    #     self.create_chataccess(user2, room_id, 'E')
    #     return room_id

    # def get_singlechat_rooms(self, profil):
    #     with ChatAccessMapper() as mapper:
    #         rooms = mapper.find_groupchat_by_profil(profil)

    # Methoden für ChatAccess

    # erstellt eine neue ChataccessBO und fügt sie in die Datenbank ein
    def create_chataccess(self, profil, room, chattype):
        access = ChatAccessBO()
        access.set_profile_id(profil)
        access.set_room(room)
        access.set_chattype(chattype)
        with ChatAccessMapper() as mapper:
            return mapper.insert(access)

    # Wenn ein neues Mitglied der Gruppe beitritt, muss ein Chataccess für ihn erstellt werden. Dadurch können später die Gruppenmitglieder einer Gruppe geholt werden
    def create_chataccess_new_member(self, profile_id, room, chattype):
        access = ChatAccessBO()
        access.set_profile_id(profile_id)
        access.set_room(room)
        access.set_chattype(chattype)

        with ChatAccessMapper() as mapper:
            return mapper.insert(access)

    # gibt alle ChataccesBO aus der Datenbank zurück
    def get_all_chataccess(self):
        with ChatAccessMapper() as mapper:
            return mapper.find_all()

    # gibt die ChataccessBO mit der angegebenen id zurück
    def get_chataccess_by_id(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.find_by_key(id)

    def get_chatacces_by_profile(self, profile):
        with ChatAccessMapper() as mapper:
            return mapper.find_by_profile(profile)

    # gibt ein Array von ChatroomIDs zurück mit den angegebenen Profil und dem Chattype = g
    # def get_groupchataccess_by_profil(self, profil):
    #     with ChatAccessMapper() as mapper:
    #         return mapper.find_groupchat_by_profil(profil)

    # gibt ein Array von ChatroomIDs zurück mit den angegebenen Profil und dem Chattype = e
    # def get_singlechataccess_by_profil(self, profil):
    #     with ChatAccessMapper() as mapper:
    #         return mapper.find_singlechat_by_profil(profil)

    # gibt alle ChatroomBO zurück mit den angegebenen Profil und dem Chattype = g
    def get_groupchats_by_profile(self, profile):
        res = []
        print(res)
        with ChatAccessMapper() as mapper:
            holder = mapper.find_groupchat_by_profile(profile)
            for elem in holder:
                print(elem)
        with ChatroomMapper() as mapper:
            for elem in holder:
                print(mapper.find_by_key(elem))
                res.append(mapper.find_by_key(elem))
                print(res)
        return res

    # gibt alle ChatroomBO zurück mit den angegebenen Profil und dem Chattype = e
    def get_singlechats_by_profile(self, profile):
        res = []
        with ChatAccessMapper() as mapper:
            holder = mapper.find_singlechat_by_profile(profile)
        with ChatroomMapper() as mapper:
            for elem in holder:
                res.append(mapper.find_by_key(elem))
        return res

    def get_chatroom_by_profile(self, profile):
        res = []
        with ChatAccessMapper() as mapper:
            holder = mapper.find_chatrooms_by_profile(profile)
        with ChatroomMapper() as mapper:
            for elem in holder:
                res.append(mapper.find_by_key(elem))
        return res

    def get_second_profile(self, room, profile):
        with ChatAccessMapper() as mapper:
            holder = mapper.find_second_profile(room)
        for elem in holder:
            if elem.get_profile_id() != profile:
                with StudentprofileMapper() as mapper:
                    return mapper.find_by_key(elem.get_profile_id())

    def get_profiles_by_room(self, id):
        with ChatAccessMapper() as mapper:
            return mapper.get_groupmembers(id)

    def delete_chatacces_by_profil_room(self, profil, room):
        with ChatAccessMapper() as mapper:
            return mapper.delete_by_room_and_profile_id(profil, room)

    # def get_groups_for_profile(self,id):
    #    groups = [self.get_profils_by_room(id)]
    #    return groups

    def delete_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.delete(access)

    def update_chataccess(self, access):
        with ChatAccessMapper() as mapper:
            return mapper.update(access)

    def get_group_by_profileid(self, id):
        # access = [self.get_groupchataccess_by_profil(id)]
        # groups = []
        # for element in access:
        #     for j in element:
        #         groups.append(self.get_group_by_id(j.get_room()))
        # return groups
        res = []
        with ChatAccessMapper() as mapper:
            holder = mapper.find_groupchat_by_profile(id)
        with GroupMapper() as mapper:
            for elem in holder:
                res.append(mapper.find_by_chatid(elem))
        return res

    # def get_group_by_id(self, number):
    #     with GroupMapper() as mapper:
    #         return mapper.find_by_key(number)

    '''@Khadidja.Kebaili
    Diese Funktion löscht alle Requests, die älter sind als 3 Tage'''

    def check_timedelta_of_request(self):
        request = self.get_all_requests()
        today = datetime.today()
        for element in request:
            deltatime = abs((element.get_request_date() - today).days)
            if deltatime > 3:
                self.delete_request(element)


