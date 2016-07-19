from rest_framework_jwt.settings import api_settings


def save_additional_info(backend, user, response, *args, **kwargs):


    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)



