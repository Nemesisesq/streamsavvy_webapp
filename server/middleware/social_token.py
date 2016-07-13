from rest_framework_jwt.settings import api_settings

class JWT(object):

    def process_request(self, request):
        pass

    def process_response(self, request, response):
        try:
            if request.user.is_authenticated():
                # TODO check if request has a token in it
                if 'HTTP_AUTHORIZATION' not in request.META:

                    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
                    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


                    payload = jwt_payload_handler(request.user)
                    token = jwt_encode_handler(payload)

                    #  TODO put the token on the response to be grabbed by the application
                    response['token'] = token

        except AttributeError as e:
            print(e)

        finally:
            return response
