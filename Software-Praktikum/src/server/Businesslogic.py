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


class Businesslogic(object):

    def __init__(self):
        self.check_timedelta_of_request()

    # def create_user(self, name, user_id, email):
    #     user = User()
    #     user.set_name(name)
    #     user.set_user_id(user_id)
    #     user.set_email(email)
    #     with UserMapper() as mapper:
    #         return mapper.insert(user)

    # def get_user_by_google_user_id(self, id):
    #     with StudentprofileMapper() as mapper:
    #     user = User()
    #     user.set_name(name)
    #     user.set_user_id(user_id)
    #     user.set_email(email)
    #     with UserMapper() as mapper:
    #         return mapper.insert(user)
    #
    # def get_user_by_google_user_id(self, id):
    #     with UserMapper() as mapper:
    #         return mapper.find_by_google_user_id(id)

    def create_profile(self, first_name, last_name, age, semester, major, hobbys, interests,
                       personality, learnstyle, studytime, studyplace, studyfrequence, workexperience):
        studentprofile = Studentprofile()
        studentprofile.set_first_name(first_name)
        studentprofile.set_last_name(last_name)
        studentprofile.set_age(age)
        studentprofile.set_semester(semester)
        studentprofile.set_major(major)
        studentprofile.set_hobbys(hobbys)
        studentprofile.set_interests(interests)
        studentprofile.set_personality(personality)
        studentprofile.set_learnstyle(learnstyle)
        studentprofile.set_studytime(studytime)
        studentprofile.set_studyplace(studyplace)
        studentprofile.set_studyfrequence(studyfrequence)
        studentprofile.set_workexperience(workexperience)

        with StudentprofileMapper() as mapper:
            return mapper.insert(studentprofile)

    def get_profile_by_id(self, number):
        with StudentprofileMapper() as mapper:
            return mapper.find_by_key(number)

    def get_all_profiles(self):
        with StudentprofileMapper() as mapper:
            return mapper.find_all()

    def save_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.update(studentprofile)

    def delete_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.delete(studentprofile)

    def create_group(self, groupname, admin, description):
        chatroom = self.create_chatroom('G')
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

    '''Hier beginnt das eigentliche Matchmaking'''
    '''Zunächst einmal wird der Score, also der Integer-Wert wie gut 2 Profile zusammenpassen berechnet
    Dazu gibt es die Methoden get_learning_habits und set_score'''

    '''Zuerst werden die für den Profilvergleich relevanten Attribute der Profile als sogenannte learning-habits
    zusammengefasst. Dazu zählen Semester (1-7), Lernzeitraum (studytime), Lernort (studyplace), Lerntyp (learnstyle),
     Studiengang (major) und Lernfrequenz (studyfrequenz)
     Diese Attribute werden als Liste realisiert, um den späteren verlgeichen so effizient und performant wie möglich
     zu gestalten.'''

    def get_learning_habbits(self, id):
        profile = self.get_profile_by_id(id)
        learning_habbits = [profile.get_studytime(), profile.get_semester(), profile.get_studyplace(),
                            profile.get_learnstyle(), profile.get_hobbys(), profile.get_major(),
                            profile.get_studyfrequence()]
        return learning_habbits

    '''Als nächstes werden die Lerngewohnheiten von einem Profil mit einem anderen verglichen. Dazu gibt es einen
    match_score. Jedesmal wenn ein Objekt in der Liste der Lerngewohnheiten des 1. Studentens auch in der Liste
    der Lerngewohnheiten des 2. Studentens ist, so steigt der match_score um eins.
    D.h. wenn die beiden Profile 3 gleiche Werte haben (beide sind bspw. im gleichen Semester, gleicher Studiengang
    und wollen gleich oft in der Woche lernen), so ist der Score = 3.'''

    def set_score(self, profile1, profile2):
        match_score = 0
        no_match_score = 0
        list1 = self.get_learning_habbits(profile1)
        list2 = self.get_learning_habbits(profile2)
        for element in list1:
            if element in list2:
                match_score += 1
            elif element not in list2:
                no_match_score += 1
        return match_score

    '''Nun möchte man aber nicht nur 2 Profile miteinander vergleichen, sondern man will ein Profil mit allen anderen
    in der Datenbank verfügbaren Profilen vergleichen. Daher wird hier eine ID gefordert (hier wird später die ID des
    current-Users übergeben). Das Profil dieser ID wird dann mit allen anderen Profilen verglichen. Damit der Score und
    die Profile miteinander verknüpft werden können werden diese in einem dict gespeichert. Das dict wird dann sortiert
    und daraus entsteht eine Liste, die als Werte nur die Profile besitzt, jedoch sind diese geordnet nach dem Score
    sortiert. '''

    def matching_list(self, id):
        scores = []
        profiles = []
        for element in range(1, (len(self.get_all_profiles()) + 1)):
            profiles.append(self.get_profile_by_id(element))
            scores.append(self.set_score(element, id))
        for element in self.get_all_profiles():
            if element.get_id() == id:
                continue
            else:
                profiles.append(element)
        matches = dict(zip(profiles, scores))
        matches = dict(
            sorted(matches.items(), key=lambda item: item[1], reverse=True))
        new_sorted_list = []
        for element in matches:
            new_sorted_list.append(element)
        return new_sorted_list

    def create_request(self, requested_by, requested, request_type):
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
            with RequestMapper() as mapper:
                return mapper.insert(request)

    def get_all_requests(self):
        with RequestMapper() as mapper:
            return mapper.find_all()

    def get_request_by_id(self, number):
        with RequestMapper() as mapper:
            return mapper.find_by_key(number)

    def get_request_of_profile(self, number):
        all_requests = self.get_all_requests()
        request = []
        for element in all_requests:
            if element.get_requested() == number and element.get_request_type() == 'E':
                request.append(element)
        return request

    def get_request_of_groups(self, number):
        all_requests = self.get_all_requests()
        request = []
        for element in all_requests:
            if element.get_requested() == number and element.get_request_type() == 'G':
                request.append(element)
        return request

    def get_profiles_of_request(self, id):
        requests_of_profile = self.get_request_of_profile(id)
        profile_ids_of_requester = []
        profiles_of_requester = []
        for element in requests_of_profile:
            profile_ids_of_requester.append(element.get_requested_by())
        for element in profile_ids_of_requester:
            profiles_of_requester.append(self.get_profile_by_id(element))
        return profiles_of_requester

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

    # Misc
    def get_profile_by_name(self, last_name):
        with StudentprofileMapper() as mapper:
            return mapper.find_by_last_name(last_name)

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

    def check_timedelta_of_request(self):
        request = self.get_all_requests()
        today = datetime.today()
        for element in request:
            deltatime = abs((element.get_request_date() - today).days)
            if deltatime > 3:
                self.delete_request(element)
