from src.server.Businesslogic import Businesslogic
from src.server.bo.RequestBO import Request
from src.server.db.RequestMapper import RequestMapper

def is_it_a_mutal_request(function):
    def wrapper(requested_by, requester):
        # adm = Businesslogic()
        match = False
        # requests = [adm.get_request_of_profile(requester)]
        # for element in requests:
        #     for j in element:
        #         if j.get_requested_by() == requester:
        #             match = True
        if match == False:
            return function(requested_by, requester)
        else:
            print('Hey, this student has already sent a request to you! Why don´t you start a chat?')
    return wrapper



@is_it_a_mutal_request
def create_request(requested_by, requested):
    request = Request()
    request.set_requested(requested)
    request.set_requested_by(requested_by)
    with RequestMapper() as mapper:
        return mapper.insert(request)

create_request(1,3)

