from matchmaker_Prototype.server.BO.Profile import Studentprofile
from matchmaker_Prototype.server.db.ProfileMapper import StudentprofileMapper
from matchmaker_Prototype.server.BO.GroupBO import Group
from matchmaker_Prototype.server.db.GroupMapper import GroupMapper

class Businesslogic (object):

    def __init__(self):
        pass

    def create_user(self, name, user_id, email):
        user = Studentprofile()
        user.set_name(name)
        user.set_user_id(user_id)
        user.set_email(email)
        with StudentprofileMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_google_user_id(self, id):
        with StudentprofileMapper() as mapper:
            return mapper.find_by_google_user_id(id)

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


    def create_group(self, groupname, description, admin):
        group = Group()
        group.set_admin(admin)
        group.set_description(description)
        group.set_groupname(groupname)
        with GroupMapper() as mapper:
            return mapper.insert(group)

    def get_group_by_id(self, number):
        with GroupMapper() as mapper:
            return mapper.find_by_key(number)

    def get_all_groups(self):
        with GroupMapper() as mapper:
            return mapper.find_all()

    def save_group(self, group):
        with GroupMapper() as mapper:
            mapper.update(group)

    def delete_group(self, group):
        with GroupMapper() as mapper:
            mapper.delete(group)

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

    def get_learning_habbits(self, id):
        profile = self.get_profile_by_id(id)
        learning_habbits = [profile.get_studytime(), profile.get_semester(), profile.get_studyplace(), profile.get_learnstyle(),
                profile.get_hobbys(), profile.get_major(), profile.get_studyfrequence()]
        return learning_habbits


    def matching_list(self, id):
        scores = []
        profiles = []
        for element in range(1, (len(self.get_all_profiles())+1)):
            profiles.append(self.get_profile_by_id(element))
            scores.append(self.set_score(element, id))
        for element in self.get_all_profiles():
            if element.get_id() == id:
                continue
            else:
                profiles.append(element)
        matches = dict(zip(profiles, scores))
        matches = dict(sorted(matches.items(), key=lambda item: item[1], reverse= True))
        new_sorted_list = []
        for element in matches:
            new_sorted_list.append(element)
        return new_sorted_list
